import { faker } from "@faker-js/faker";
import express from "express";
import { nanoid } from "nanoid";
import { createRandomUser } from "./faker.js";
const app = express();
import Producer from "./producer.js";
const producer = new Producer();


app.post("/webhook", async (req, res, next) => {
console.log(`message received`)
  res.send(`done`);
});
console.log(process.env.SERVER_NAME)

app.listen(process.env.PORT, () => {
  console.log("Server started... at "+process.env.PORT);

if(process.env.IS_MAIN)
  {setTimeout(() => {
    setInterval(async () => {
      const message = createRandomUser()
      await producer.publishMessage("info", message,"default_exchange");
    }, 1);
  }, 10900);
}});
