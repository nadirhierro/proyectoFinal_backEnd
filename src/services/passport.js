import passport from "passport";
import { createTransport } from "nodemailer";
import LocalStrategy from "passport-local";
import userService from "../components/services/users/index.js";
import { encrypt, decrypt } from "../services/encrypt.js";

const users = new userService();

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "sibyl.ullrich@ethereal.email",
    pass: "Wrn63seREPA1wwCyHd",
  },
});

passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {
    try {
      let user = await users.getUser(username);
      if (!user) return done(null, false);
      if (decrypt(user.password) !== password) return done(null, false);
      return done(null, user);
    } catch (err) {
      console.log(err);
    }
  })
);

passport.use(
  "signup",
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      try {
        let email = req.body.username;
        let password = encrypt(req.body.password);
        let name = req.body.name;
        let address = req.body.address;
        let age = req.body.age;
        let phone = req.body.phone;
        let avatar = req.body.avatar;
        let user = await users.getUser(username);
        if (user) return done(null, false);
        let newUser = {
          email,
          password,
          name,
          address,
          age,
          phone,
          avatar,
          isAdmin: false,
        };
        await users.newUser(newUser);
        return done(null, newUser);
      } catch (err) {
        console.log(err);
      }
    }
  )
);

// Serialize y desirialize
passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  let user = users.getUser(email);
  done(null, user);
});

export { passport };
