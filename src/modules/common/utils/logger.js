const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({
            stack: true
        }),
        winston.format.splat(),
        winston.format.json()
    ),
    defaultMeta: {
        service: 'nodejs-express-api'
    },
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(({
                    level,
                    message,
                    label,
                    timestamp
                }) => {
                    return `${timestamp} [${label}] ${level}: ${message}`;
                })
            )
        }),
        new winston.transports.File({
            filename: 'error.log',
            level: 'error'
        }),
        new winston.transports.File({
            filename: 'combined.log'
        })
    ]
});

module.exports = {
    logger
};