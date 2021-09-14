//libraries
import express from "express";
import passport from "passport";

//database models
import { RestaurantModel } from "../../database/allModels";

//validation
import { ValidateRestaurantCity, ValidateRestaurantSearchString } from "../../validation/restaurant";
import { ValidateRestaurantId } from "../../validation/food";

//router setup
const Router = express.Router();

//get restaurant based on cities
/*
Route:           /
Description :    get all the restaurant details based on city
Params:          None
Access:          Public
Method:          get
*/
Router.get("/", async (req, res) => {
    try {
        await ValidateRestaurantCity(req.query);
        const { city } = req.query;
        const restaurants = await RestaurantModel.find({ city });
        return res.json({ restaurants });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

//get individual restaurant based on id
/*
Route:           /
Description :    get individual restaurant details based on id
Params:          id
Access:          Public
Method:          get
*/
Router.get("/:_id", async (req, res) => {
    try {
        await ValidateRestaurantId(req.params);
        const { _id } = req.params;
        const restaurant = await RestaurantModel.findOne(_id);
        if (!restaurant) return res.status(404).json({ error: "Restaurant not found!" });
        return res.json({ restaurant });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

//get restaurant on search
/*
Route:           /
Description :    get restaurant details based on search  strings
Params:          None
Body:            Search string
Access:          Public
Method:          get
*/
Router.get("/search", async (req, res) => {
    try {
        await ValidateRestaurantSearchString(req.body);
        const { searchString } = req.body;
        const restaurants = await RestaurantModel.find({
            name: { $regex: searchString, $options: "i" }
        });
        if (!restaurants) return res.status(404).json({ error: ` No Restaurant matches for ${searchString}` });
        return res.json({ restaurants });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;
