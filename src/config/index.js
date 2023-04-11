const dotenv = require('dotenv');

// Load environment variables based on the current environment
if (process.env.NODE_ENV === 'development') {
    dotenv.config({
        path: '.env.development'
    });
} else if (process.env.NODE_ENV === 'production') {
    dotenv.config({
        path: '.env.production'
    });
}

module.exports = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    LOG_FILE: process.env.LOG_FILE || path.join(__dirname, 'logs', 'app.log')
};