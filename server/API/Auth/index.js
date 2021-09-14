//Library
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";

//Models
import { UserModel } from "../../database/user"

//validation
import { ValidateSignUp, ValidateSignin } from "../../validation/auth";

const Router = express.Router();

//sign up route
/*
Route:           /signup
Description :    signup with email and password
Params:          None
Access:          Public
Method:          Post
*/
Router.post("/signup", async (req, res) => {
    try {
        //validation
        await ValidateSignUp(req.body.credentials);
        //check whether email exists
        await UserModel.findByEmailAndPhone(req.body.credentials);

        //save to database
        const newUser = await UserModel.create(req.body.credentials);

        //generate JWT auth tokens
        const token = newUser.generateJwtToken();

        //return
        return res.status(200).json({ token, status: "success" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

//sign in route
/*
Route:           /signin
Description :    signin with email and password
Params:          None
Access:          Public
Method:          Post
*/
Router.post("/signin", async (req, res) => {
    try {
        await ValidateSignin(req.body.credentials);
        //check whether email exists
        const user = await UserModel.findByEmailAndPassword(req.body.credentials);

        //generate JWT auth tokens
        const token = user.generateJwtToken();

        //return
        return res.status(200).json({ token, status: "success" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

//google sign in auth route
/*
Route:           /google
Description :    google sign in
Params:          None
Access:          public
Method:          get
*/
Router.get("/google", passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"],
})
);

//google sign in callback
/*
Route:           /google
Description :    google signin callback
Params:          None
Access:          public
Method:          get
*/
Router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        return res.json({ token: req.session.passport.user.token });
    }
);

export default Router;