let isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.render("index");
  }
};

export default isAuth;
