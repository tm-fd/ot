import express from 'express';
import axios from 'axios';
import { env } from 'process';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});


 app.get("/orders", async (req, res) => {
  const ordersPage = req.query.ordersPage
  console.log(ordersPage)
  try {
    const response = await axios.get(`https://imvilabs.com/wp-json/wc/v3/orders?per_page=${ordersPage}`, {
      auth: {
        username: process.env.WOO_API_KEY,
        password: process.env.WOO_API_SECERT,
      },
    });
    const result = response.data;
    res.send(JSON.stringify(result));
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

app.get("/shipping", async (req, res) => {
  const {orderNumber, orderDate} = req.query
  console.log(orderNumber, orderDate)
  try {
    const response = await axios.get(`https://www.e3pl.se/system/api.asp?s=443ce94115bf88d519dc6ce2c7489d59&typ=skickat&order=${orderNumber}&datum=${orderDate}&data=txt`, {
    });
    const result = response.data;
    const jsonResult = convertToJSON(result);
    res.send(JSON.stringify(jsonResult));
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
});


const convertToJSON = (text) => {
  
  const lines = text.trim().replace(/;/g, ',').replace(/<br>/g, ',');
  const resultArr = lines.split(',')
  const removeLast = resultArr.slice(0,resultArr.length-1)
  const result = [];
for (let i = 0; i < removeLast.length; i += 3) {
  result.push({
    id: removeLast[i],
    trackingCode: removeLast[i + 1],
    date: removeLast[i + 2]
  });
}
  return result
  
};





app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
