import express from "express";
import authController from "../../components/controllers/authController/index.js";

const { Router } = express;

let auth = new authController();

let routerHome = new Router();

routerHome.get("/login", auth.goLogin);

routerHome.get("/signup", auth.goSignUp);

routerHome.get("/", auth.isAuth, auth.goIndex);

routerHome.post("/login", auth.makeLogin);

routerHome.get("/logout", auth.makeLogout);

routerHome.post("/signup", auth.uploadAvatar, auth.makeSignup);

routerHome.get("/home", auth.isAuth, auth.goHome);

routerHome.get("/faillogin", auth.failLogin);

routerHome.get("/failsignup", auth.failSignup);

export default routerHome;
