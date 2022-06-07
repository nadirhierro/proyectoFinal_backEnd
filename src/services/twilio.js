import twilio from "twilio";
import { twilioConfig } from "../config/index.js";

export default class twilioService {
  constructor() {
    this.sid = twilioConfig.sid;
    this.token = twilioConfig.token;
    this.client = twilio(this.sid, this.token);
  }

  async sendMessage(body, to) {
    try {
      const message = await client.messages.create({
        body: body,
        from: "whatsapp:+16573009784",
        to: `whatsapp:${to}`,
      });
      console.log(message);
    } catch (err) {
      console.log(err);
    }
  }

  async newOrder(adminPhone, userPhone) {
    try {
      await this.sendMessage("New order", adminPhone);
      await this.sendMessage("New order in process", userPhone);
    } catch (err) {
      console.log(err);
    }
  }
}
