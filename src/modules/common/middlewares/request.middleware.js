const {
    validationResult
} = require('express-validator');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    res.status(400).json({
        message: errors.array()[0].msg
    });
};

module.exports = {
    validateRequest
};