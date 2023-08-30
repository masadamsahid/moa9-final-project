import { Handler } from "express";


export const bodyEmptyStrToNull: Handler = (req, res, next) => {
  
  const body = req.body;
  
  // convert empty str to null
  Object.keys(body).forEach((key) => {
    if (body[key].length <= 0) body[key] = null;
  });
  
  next();
}

