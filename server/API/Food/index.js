//libraries
import express from "express";
import passport from "passport";

//database models
import { FoodModel } from "../../database/allModels";

//validation
import { ValidateRestaurantId, Validatecategory } from "../../validation/food";

//router setup
const Router = express.Router();

//get all food based on particular restaurant
/*
Route:           /r
Description :    get all food based on particular restaurant
Params:          id
Access:          Public
Method:          get
*/
Router.get("/r/:_id", async (req, res) => {
    try {
        await ValidateRestaurantId(req.params);
        const { _id } = req.params;
        const foods = await FoodModel.find({ restaurant: _id });
        return res.json({ foods });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

//get all food based on category
/*
Route:           /c
Description :    get all food based on category
Params:          category
Access:          Public
Method:          get
*/
Router.get("/c/:category", async (req, res) => {
    try {
        await Validatecategory(req.params);
        const { category } = req.params;
        const foods = await FoodModel.find({ category: { $regex: category, $options: "i" } });
        return res.json({ foods });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;