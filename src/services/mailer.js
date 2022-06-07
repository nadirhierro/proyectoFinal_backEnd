import { createTransport } from "nodemailer";
import { mail } from "../config/index.js";

export default class mailService {
  constructor() {
    this.transporter = createTransport({
      host: mail.host,
      port: mail.port,
      auth: {
        user: mail.user,
        pass: mail.pass,
      },
    });
  }

  async newUser(user) {
    try {
      const mailOptions = {
        from: "Nodejs Server",
        to: "nadir.hierro@gmail.com",
        subject: "New user",
        html: `
        <h2>Nuevo usuario</h2>
        <p>Email: ${user.email}</p>
        <p>Nombre: ${user.name}</p>
        `,
      };
      const info = await this.transporter.sendMail(mailOptions);
    } catch (err) {
      console.log(err);
    }
  }

  async newOrder(user, products) {
    try {
      const mailOptions = {
        from: "Nodejs Server",
        to: "nadir.hierro@gmail.com",
        subject: "New user",
        html: `
          <h2>Nueva orden</h2>
          <p>Email: ${user.email}</p>
          <p>Nombre: ${user.name}</p>
          <ul>
          ${products.map((product) => `<li>${product.name}</li>`)}</ul>
          `,
      };
      const info = await this.transporter.sendMail(mailOptions);
      console.log(info);
    } catch (err) {
      console.log(err);
    }
  }
}
