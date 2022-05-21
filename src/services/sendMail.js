import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "sibyl.ullrich@ethereal.email",
    pass: "Wrn63seREPA1wwCyHd",
  },
});

const sendMailNewUser = async function (user) {
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
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
  } catch (err) {
    console.log(err);
  }
};

const sendMailNewOrder = async function (user, products) {
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
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
  } catch (err) {
    console.log(err);
  }
};

export { sendMailNewOrder, sendMailNewUser };
