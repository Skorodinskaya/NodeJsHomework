const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const {MONGO_CONNECT_URL, PORT, ALLOWED_ORIGIN, NODE_ENV} = require('./configs/config');
// const startCron = require('./cron');
const {DEFAULT_STATUS_ERR} = require('./configs/constants');
const {defaultDataUtil} = require('./util');
const swaggerJson = require('./docs/swagger.json');
const Sentry = require('./logger/sentry');

const app = express();

mongoose.connect(MONGO_CONNECT_URL).then(() => {
    console.log('Mongo connected successfully');
});

app.use(helmet());
app.use(cors({origin: _configureCors}));
app.use(Sentry.Handlers.requestHandler());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}));

if (NODE_ENV === 'dev') {
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

app.use(fileUpload({}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const {authRouter, userRouter} = require('./routes');
const {ErrorHandler, message_enum} = require('./errors');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use(Sentry.Handlers.errorHandler());

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    Sentry.captureException(err);

    res
        .status(err.status || DEFAULT_STATUS_ERR)
        .json({
            message: err.message
        });
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
    defaultDataUtil();
    // startCron();
});

function _configureCors(origin, callback) {
    if (NODE_ENV === 'dev') {
        return callback(null, true);
    }
    const whiteList = ALLOWED_ORIGIN.split(';');

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler(message_enum.COR_NOT_ALLOWED), false);
    }
    return callback(null, true);
}


