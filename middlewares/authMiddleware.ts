import { Handler } from "express";

class AuthMiddleware {
  
  mustLogin: Handler = (req, res, next) => {
    if (req.isUnauthenticated()) return res.redirect("/login");
    return next();
  }
  
}

export default AuthMiddleware;
