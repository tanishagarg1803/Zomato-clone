//libraries
import express from "express";
import passport from "passport";

//database models
import { UserModel } from "../../database/allModels";

//validation
import { ValidateUserId, ValidateUserData } from "../../validation/user";

//router setup
const Router = express.Router();

//get user details
/*
Route:           /
Description :    get user details
Params:          _id
Body :           none
Access:          Public
Method:          get
*/
Router.get("/:_id", async (req, res) => {
    try {
        await ValidateUserId(req.params);
        const { _id } = req.params;
        const getUser = await UserModel.findById(_id);
        return res.json({ user: getUser });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

//update the user data
/*
Route:           /update
Description :    update the user data
Params:          userId
Body :           none
Access:          Public
Method:          put
*/
Router.put("/update/:userId", async (req, res) => {
    try {
        await ValidateUserId(req.params);
        const { userId } = req.params;
        await ValidateUserData(req.body);
        const { userData } = req.body;
        const updateUserData = await UserModel.findByIdAndUpdate(
            userId,
            {
                $set: userData
            },
            {
                new: true
            }
        );
        return res.json({ user: updateUserData });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


export default Router;