import { Router } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import prisma from "../db/prisma";
import passport from "passport";

dotenv.config();

const authRoutes = Router();

authRoutes.get('/register', (req, res) => {
  return res.render("register");
});

authRoutes.get('/login', (req, res) => {
  return res.render("login");
});

authRoutes.post("/register", passport.authenticate("local-register", {
  successRedirect: "/books",
  failureRedirect: "/register",
  failureFlash: true,
}));

// authRoutes.post('/register', async (req, res) => {
//   const body = req.body;
//   const salt = Number(process.env.HASH_SALT);
//
//   console.log({ body });
//
//   const hashPwd = await bcrypt.hash(body.password, salt);
//
//   const newUser = await prisma.user.create({
//     data: {
//       email: body.email,
//       password: hashPwd,
//       full_name: body.name,
//       desc: body.desc,
//     },
//   });
//
//   console.log({ newUser });
//
//   return res.render("login");
// });


export default authRoutes;