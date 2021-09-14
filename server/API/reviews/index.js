//libraries
import express from "express";
import passport from "passport";

//database models
import { ReviewModel } from "../../database/allModels";

//validation
import { ValidateReviewId, ValidateReviewData } from "../../validation/review";

//router setup
const Router = express.Router();

//add new food and restaurant review or rating
/*
Route:           /new
Description :    add new food or restaurant review or rating
Params:          none
Body :           review object
Access:          Public
Method:          get
*/
Router.post("/new", async (req, res) => {
    try {
        await ValidateReviewData(req.body);
        const { reviewData } = req.body;
        await ReviewModel.create(reviewData);
        return res.json({ review: "Successfully Created Review" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

//delete a review
/*
Route:           /delete
Description :    delete a review
Params:          _id
Body :           none
Access:          Public
Method:          delete
*/
Router.delete("/delete/:_id", async (req, res) => {
    try {
        await ValidateReviewId(req.params);
        const { _id } = req.params;
        await ReviewModel.findByIdAndDelete(_id);
        return res.json({ review: "Successfully Deleted Review" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


export default Router;