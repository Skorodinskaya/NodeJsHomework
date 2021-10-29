const {SENTRY_DSN} = require('../configs/config');
const Sentry = require('@sentry/node');

Sentry.init({
    dsn: SENTRY_DSN
});

module.exports = Sentry;

