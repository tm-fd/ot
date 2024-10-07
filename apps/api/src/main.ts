import express from 'express';
import axios from 'axios';
import { PrismaClient as PrismaClientSQL} from '@prisma/mysql'
import { PrismaClient as PrismaClientMariaDB } from '@prisma/maria'
import { body } from 'express-validator';
import { getTrackingInfo } from './scheduledFunctions/getShippmentsTracking'

const prisma = new PrismaClientSQL()
const maria_prisma = new PrismaClientMariaDB({ datasources: { db: { url: process.env.MARIADB_URL } } })

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(express.json());
      //  getTrackingInfo()

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});


 app.get("/orders", async (req, res) => {
  const ordersPage = req.query.ordersPage
  try {
    const response = await axios.get(`https://imvilabs.com/wp-json/wc/v3/orders?per_page=${ordersPage}`, {
      auth: {
        username: process.env.WOO_API_KEY,
        password: process.env.WOO_API_SECERT,
      },
    });
    const result = response.data;
    const f3pl = await prisma.shippingInfo.findMany()
    const mapped_result = result.map(o => {
      const trackingInfo = f3pl.find(t => Number(t.orderId) === o.id)
      return {...o, trackingInfo}
    })
      const resultWithShippingInfo = await Promise.all(mapped_result.map(async o => {
        if(o.trackingInfo){
          const pn_response = await axios.get(`https://api2.postnord.com/rest/shipment/v5/trackandtrace/findByIdentifier.json`, {
            params: {
              apikey: process.env.PN_API_KEY,
              id: o.trackingInfo.trackingNumber,
              locale: 'en',
            },
          });
          const trackingStatus = pn_response.data.TrackingInformationResponse.shipments[0].statusText.header
          return {...o, trackingInfo: {...o.trackingInfo, trackingStatus}}
        }else {
          return o;
        }
      })
    )
      res.send(JSON.stringify(resultWithShippingInfo));
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
});

// app.get('/orders/:q', async (req, res) => {
//   const q = req.query;
//   const decodedQ = {};
//   const params = new URLSearchParams();

// Object.keys(q).forEach((key) => {
//   decodedQ[key] = decodeURIComponent(q[key] as string);
//   params.append(key, Array.isArray(decodedQ[key]) ? decodedQ[key].join(',') : decodedQ[key].toString());
// });
// const queryString = params.toString();
//  console.log(queryString)
//   try {
//     const response = await axios.get(`https://imvilabs.com/wp-json/wc/v3/orders?${queryString}`, {
//       auth: {
//         username: process.env.WOO_API_KEY,
//         password: process.env.WOO_API_SECERT,
//       },
//     });
//     const result = response.data;
//     res.send(JSON.stringify(result));
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send("An error occurred");
//   }
// });

app.post('/add-order', async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    code,
    numberOfVrGlasses,
    numberOfLicenses,
    isSubscription,
    duration,
    orderNumber,
  } = req.body;
console.log(req.body)

  if (!email) {
    return res.status(404).json({ error: "Email adddress is missing " });
  }

  if (!body('email').isEmail()) {
    return res
      .status(404)
      .json({ error: "Please provide a valid email address" });
  }

  if (!firstName) {
    return res.status(404).json({ error: "First Name is missing " });
  }

  if (!lastName) {
    return res.status(404).json({ error: "Last Name is missing " });
  }

  if (!code) {
    return res.status(404).json({ error: "Activation Code is missing " });
  }

  if (!orderNumber) {
    return res.status(404).json({ error: "Order Number is missing " });
  }

  if (
    undefined === numberOfVrGlasses ||
    typeof numberOfVrGlasses !== "number"
  ) {
    return res
      .status(404)
      .json({ error: "Number of VR Glasses value is missing or is invalid" });
  }

  if (undefined === numberOfLicenses || typeof numberOfLicenses !== "number") {
    return res
      .status(404)
      .json({ error: "Number of Licenses is missing or is invalid" });
  }

  if (undefined === isSubscription) {
    return res
      .status(404)
      .json({ error: "Is Subscription is missing or is invalid" });
  }

  if (undefined === duration || typeof duration !== "number") {
    return res.status(404).json({ error: "Duration is missing or is invalid" });
  }
  try {
    const purchase = await maria_prisma.purchase.findUnique({
      where: {
        code: code,
      },
    });

    if (purchase) {
      return res.status(404).json({ error: "Purchase code already used" });
    }
    const result = await maria_prisma.purchase.create({
      data: {
        email: email,
        first_name: firstName,
        last_name: lastName,
        code: code,
        number_of_vr_glasses: numberOfVrGlasses,
        number_of_licenses: numberOfLicenses,
        is_subscription: isSubscription,
        duration: duration,
        order_number: orderNumber,
      },
    });
    res.status(400).json(result);
} catch (error) {
      console.error("Error:", error);
      res.status(500).send("An error occurred");
    }

})



app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
