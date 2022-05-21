import twilio from "twilio";
import { twilioConfig } from "../config/index.js";

const accountSid = twilioConfig.sid;
const authToken = twilioConfig.token;

const client = twilio(accountSid, authToken);

const sendMessage = async function (body, to) {
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
};

export default sendMessage;
