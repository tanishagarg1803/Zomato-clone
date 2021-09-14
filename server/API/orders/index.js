//libraries
import express from "express";
import passport from "passport";

//database models
import { OrderModel } from "../../database/allModels";

//validation
import { ValidateOrderId, ValidateOrderDetails } from "../../validation/order";

//router setup
const Router = express.Router();

//get all orders based on id
/*
Route:           /
Description :    get all orders based on id
Params:          _id
Access:          Public
Method:          get
*/
Router.get("/:_id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        await ValidateOrderId(req.params);
        const { _id } = req.params;
        const getOrders = await OrderModel.findOne({ user: _id });
        if (!getOrders) {
            return res.status(400).json({ error: "user not found" });
        }
        return res.status(200).json({ orders: getOrders });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

//add new order
/*
Route:           /new
Description :    add new order
Params:          _id
Access:          Public
Method:          post
*/
Router.post("/new/:_id", async (req, res) => {
    try {
        await ValidateOrderId(req.params);
        const { _id } = req.params;
        await ValidateOrderDetails(req.body);
        const { orderDetails } = req.body;
        const addNewOrder = await OrderModel.findOneAndUpdate(
            {
                user: _id
            },
            {
                $push: { orderDetails }
            },
            {
                new: true
            }
        );
        return res.json({ orders: addNewOrder });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;