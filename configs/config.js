module.exports = {
    MONGO_CONNECT_URL: process.env.MONGO_CONNCET_URL || 'mongodb://localhost:27017/june-2021',
    PORT: process.env.PORT || 5000,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'zzz',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'xxx',
};

