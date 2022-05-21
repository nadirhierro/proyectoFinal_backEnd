import express from "express";
import { upload } from "../../utils/multer/index.js";
import { passport } from "../../services/passport.js";
import isAuth from "../../utils/isAuth/index.js";

const { Router } = express;

let routerHome = new Router();

routerHome.get("/", isAuth, (req, res, next) => {
  res.redirect("/home");
});

routerHome.get("/login", (req, res, next) => {
  res.render("login");
});

routerHome.get("/logout", async (req, res, next) => {
  try {
    let user = await req.user;
    req.session.destroy((err) => {
      if (!err) {
        res.render("logout", { name: user[0].name });
      } else {
        res.send({ status: "logout ERROR", body: err });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

routerHome.get("/home", isAuth, async (req, res, next) => {
  try {
    let user = await req.user;
    console.log(user);
    res.render("home", {
      name: user[0].name,
      thumbnail: user[0].avatar,
      email: user[0].email,
    });
  } catch (err) {
    console.log(err);
  }
});

routerHome.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "home",
    failureRedirect: "faillogin",
  })
);

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
  upload.single("avatar"),
  passport.authenticate("signup", {
    successRedirect: "home",
    failureRedirect: "failsignup",
  })
);

export default routerHome;
