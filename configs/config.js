module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',

    MONGO_CONNECT_URL: process.env.MONGO_CONNCET_URL || 'mongodb://localhost:27017/june-2021',
    PORT: process.env.PORT || 5000,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'zzz',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'xxx',
    JWT_ACTION_SECRET: process.env.JWT_ACTION_SECRET || 'xxx',
    JWT_PASSWORD_FORGOT_SECRET: process.env.JWT_PASSWORD_FORGOT_SECRET || 'zzz',
    JWT_PASSWORD_UPGRADE_SECRET: process.env.JWT_PASSWORD_UPGRADE_SECRET || 'xxx',


    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'skorodinskaya777@gmail.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || 'superuser01',

    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'root',

    LINK_TO_WEBSITE: process.env.LINK_TO_WEBSITE || 'ttt',

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',

    DEFAULT_PASSWORD_ADMIN: process.env.DEFAULT_PASSWORD_ADMIN || 'default password',

    AWS_S3_REGION: process.env. AWS_S3_REGION,
    AWS_S3_NAME: process.env.AWS_S3_NAME,
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,

    SENTRY_DSN: process.env.SENTRY_DSN
};

