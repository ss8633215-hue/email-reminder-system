import cron from "node-cron";
import { sendEmail } from "./emailService.js";

export function scheduleReminders(reminders) {
  cron.schedule("* * * * *", async () => {
    const now = new Date();
    const dueReminders = await reminders.find({ date: { $lte: now } }).toArray();
    for (const reminder of dueReminders) {
      await sendEmail(reminder.email, reminder.message);
      await reminders.deleteOne({ _id: reminder._id });
    }
  });
}
