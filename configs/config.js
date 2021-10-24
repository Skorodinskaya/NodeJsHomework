module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',

    MONGO_CONNECT_URL: process.env.MONGO_CONNCET_URL || 'mongodb://localhost:27017/june-2021',
    PORT: process.env.PORT || 5000,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'zzz',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'xxx',
    JWT_ACTION_SECRET: process.env.JWT_ACTION_SECRET || 'xxx',
    JWT_PASSWORD_FORGOT_SECRET: process.env.JWT_PASSWORD_FORGOT_SECRET || 'zzz',
    JWT_PASSWORD_UPGRADE_SECRET: process.env.JWT_PASSWORD_UPGRADE_SECRET || 'xxx',


    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'ooo',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || 'ppp',

    LINK_TO_WEBSITE: process.env.LINK_TO_WEBSITE || 'ttt',

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',

    DEFAULT_PASSWORD_ADMIN: process.env.DEFAULT_PASSWORD_ADMIN || 'default password',
};

