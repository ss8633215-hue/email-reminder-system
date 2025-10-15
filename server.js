import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { sendEmail } from "./src/emailService.js";
import cron from "node-cron";
import { scheduleReminders } from "./src/scheduler.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

const client = new MongoClient(process.env.MONGO_URI);
await client.connect();
const db = client.db("reminderDB");
const reminders = db.collection("reminders");

app.post("/add-reminder", async (req, res) => {
  const { email, message, date } = req.body;
  await reminders.insertOne({ email, message, date });
  res.send({ success: true, msg: "Reminder added!" });
});

scheduleReminders(reminders);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
