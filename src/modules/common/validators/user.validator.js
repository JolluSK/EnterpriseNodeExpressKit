const {
    body,
    param
} = require('express-validator');
const User = require('../user/user.model');

const validateUser = (method) => {
    switch (method) {
        case 'createUser':
            return [
                body('name').isLength({
                    min: 1
                }),
                body('email').isEmail().custom(async (value) => {
                    const user = await User.findOne({
                        email: value
                    });
                    if (user) {
                        return Promise.reject('Email already in use');
                    }
                }),
                body('password').isLength({
                    min: 6
                })
            ];
        case 'updateUser':
            return [
                param('id').isMongoId(),
                body('name').isLength({
                    min: 1
                }).optional(),
                body('email').isEmail().custom(async (value, {
                    req
                }) => {
                    const user = await User.findOne({
                        email: value
                    });
                    if (user && user._id.toString() !== req.params.id) {
                        return Promise.reject('Email already in use');
                    }
                }).optional(),
                body('password').isLength({
                    min: 6
                }).optional()
            ];
    }
};

module.exports = {
    validateUser
};