//libraries
import express from "express";
import passport from "passport";

//database models
import { MenuModel, ImageModel } from "../../database/allModels";

//validation
import { ValidateMenuId, ValidateMenuImageId } from "../../validation/menu";

//router setup
const Router = express.Router();

//get all menu based on id
/*
Route:           /list
Description :    get menu based on id
Params:          _id
Access:          Public
Method:          get
*/
Router.get("/list/:_id", async (req, res) => {
    try {
        await ValidateMenuId(req.params);
        const { _id } = req.params;
        const menus = await MenuModel.findOne(_id);
        return res.json({ menus });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

//get all menu images based on id
/*
Route:           /image
Description :    get menu images based on id
Params:          _id
Access:          Public
Method:          get
*/
Router.get("/image/:_id", async (req, res) => {
    try {
        await ValidateMenuImageId(req.params);
        const { _id } = req.params;
        const menus = await ImageModel.findOne(_id);
        return res.json({ menus });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;