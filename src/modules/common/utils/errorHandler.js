const {
    errorMiddleware
} = require('./error.middleware');
const {
    logger
} = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    logger.error(err);
    errorMiddleware(err, req, res, next);
};

module.exports = {
    errorHandler
};