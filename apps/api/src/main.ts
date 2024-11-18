import express from 'express';
import axios from 'axios';
import cors from "cors";
import { PrismaClient } from '@prisma/client';
import { getTrackingInfo } from './scheduledFunctions/getShippmentsTracking'

const prisma = new PrismaClient()

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3333;

const app = express();
app.use(express.json());
app.use(cors());
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

app.get("/woo-emails", async (req, res) => {
  try {
    const response = await axios.get(`https://api.mailjet.com/v3/REST/message?Limit=200&ShowSubject=true&ShowContactAlt=true&Sort=ArrivedAt+DESC`, {
      auth: {
        username: process.env.MAILJET_USERNAME,
        password: process.env.MAILJET_PASSWORD,
      },
    });
    const result = response.data;
      res.send(JSON.stringify(result.Data));
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
});

app.get('/get-purchases', async (req, res) => {
    
  try {
    const purchases = await prisma.purchase.findMany();
    if (!purchases) {
      return res.status(404).json({ error: "Could not fetch purchases" });
    }

    res.status(200).json(purchases);
} catch (error) {
      console.error("Error:", error);
      res.status(500).send("An error occurred");
    }

})




app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
