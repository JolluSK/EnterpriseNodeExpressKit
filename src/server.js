
const express = require('express');
const app = express();
const userRoutes = require('./modules/user/user.routes');
const connectDB = require('./config/database');
const {
    validateRequest
} = require('./modules/common/middlewares/request.middleware');
const {
    errorHandler
} = require('./modules/common/utils/errorHandler');

const {
    logger
} = require('./modules/common/utils/logger');

connectDB();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use(validateRequest);

// Use the error handler middleware
app.use(errorHandler);

// Log unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled rejection at ${promise}: ${reason}`);
});

module.exports = app;