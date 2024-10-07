import cron from 'node-cron';
import axios from 'axios';
import { PrismaClient as PrismaClientSQL} from '@prisma/mysql'
const prisma = new PrismaClientSQL()

export const getTrackingInfo = async () => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    try {
        const response = await axios.get(`https://www.e3pl.se/system/api.asp?s=443ce94115bf88d519dc6ce2c7489d59&typ=skickat&order=alla&datum=${formattedDate}&data=txt`);
        const result = response.data;
        const data = convertToJSON(result);
        console.log(data)
        await prisma.shippingInfo.createMany({
            data
          })
      } catch (error) {
        console.error("Errors:", error);
      }
    console.log("I'm executed on a schedule! **3PL");
}

cron.schedule("00 20 * * *", getTrackingInfo)

const convertToJSON = (text) => {
    const lines = text.trim().replace(/;/g, ',').replace(/<br>/g, ',');
    const resultArr = lines.split(',')
    const removeLast = resultArr.slice(0,resultArr.length-1)
    const result = [];
  for (let i = 0; i < removeLast.length; i += 3) {
    result.push({
      orderId: removeLast[i],
      trackingNumber: removeLast[i + 1],
      createdAt: removeLast[i + 2]
    });
  }
    return result
    
  };