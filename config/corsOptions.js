const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: "*",
    credentials: true
}

module.exports = corsOptions;