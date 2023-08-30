import { Strategy as LocalStrategy } from "passport-local";
import { PassportStatic } from "passport";
import dotenv from "dotenv";
import prisma from "../db/prisma";
import bcrypt from "bcrypt";

dotenv.config();

const passportConfig = (passport: PassportStatic) => {
  
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
  
  passport.use("local-register", new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      prisma.user.findUnique({
        where: { email: username },
      }).then(async user => {
        if (user) return done(null, false, {
          message: "Email already registered"
        });
        
        const salt = Number(process.env.HASH_SALT);
        const hashPwd = await bcrypt.hash(password, salt);
        
        const newUser = await prisma.user.create({
          data: {
            email: username,
            password: hashPwd,
            full_name: req.body.name,
            desc: req.body.desc,
          },
        });
        
        return done(null, newUser);
      }).catch((err) => {
        return done(err);
      });
    }
  ));
  
}

export default passportConfig;