import Joi from "joi";

export const userValidator = Joi.object({
    name: Joi.string()
        .required()
        .min(2)
        .max(50),

    password: Joi.string()
        .required()
        .max(8),

    email: Joi.string()
        .required()
        .email(),

    phonenumber: Joi.string()
        .optional(),

    role: Joi.string()
        .valid("student", "landlord")
        .required()
});