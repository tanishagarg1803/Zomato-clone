import joi from "joi";

export const ValidateOrderId = (orderId) => {
    const Schema = joi.object({
        _id: joi.string().required()
    });
    return Schema.validateAsync(orderId);
};

export const ValidateOrderDetails = (orderDetails) => {
    const Schema = joi.object({
        food: joi.string().required(),
        quantity: joi.number().required(),
        paymode: joi.string().required(),
        status: joi.string(),
        paymentDetails: joi.object({
            arg: joi.string().valid('itemTotal', 'promo', 'tax'),
            value: joi.number().required()
        })
    });
    return Schema.validateAsync(orderDetails);
};
