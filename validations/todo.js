const { Joi } = require('express-validation');

const createTodoValidate = {
    body: Joi.object({
        title: Joi.string()
            .required()
            // .message('Title is required!')
            .min(5)
            .message('Title should be minimum 5 character long!'),
        content: Joi.string()
            // .min(20)
            // .message('Content should be minimum 50 character long!')
    })
}

const validation = {
    createTodoValidate,
}

module.exports = validation;