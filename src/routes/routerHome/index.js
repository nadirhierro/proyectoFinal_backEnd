import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import { userDatabase } from "../../components/containers/daos/index.js";

const { Router } = express;

const users = new userDatabase();

let routerHome = new Router();

passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {
    try {
      let userArray = await users.getUser(username);
      let user = userArray[0];
      if (!user) return done(null, false);
      if (user.password != password) return done(null, false);
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
        let password = req.body.password;
        let name = req.body.name;
        let address = req.body.address;
        let age = req.body.age;
        let phone = req.body.phone;
        let avatar = req.body.avatar;
        let user = await users.getUser(username);
        if (user?.length > 0) return done(null, false);
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
        console.log(newUser);
        await users.save(newUser);
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

routerHome.get("/", (req, res, next) => {
  res.render("index");
});

// Login

routerHome.get("/login", (req, res, next) => {
  res.render("login");
});

routerHome.get("/logout", (req, res, next) => {
  res.render("logout");
});

routerHome.get("/home", (req, res, next) => {
  res.render("home");
});

// Local Login
routerHome.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "home",
    failureRedirect: "faillogin",
  })
);

// Local Signup
routerHome.get("/signup", (req, res, next) => {
  res.render("signup");
});

routerHome.get("/faillogin", (req, res, next) => {
  res.render("faillogin");
});

routerHome.get("/failsignup", (req, res, next) => {
  res.render("failsignup");
});

routerHome.post(
  "/signup",
  passport.authenticate("signup", {
    successRedirect: "home",
    failureRedirect: "failsignup",
  })
);

export default routerHome;
