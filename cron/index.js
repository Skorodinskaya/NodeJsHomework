const cron = require('node-cron');

const removeOldTokens = require('./old_token_remove.job');

module.exports = () => {
    cron.schedule('*/10 * * * * *', async () => {
        console.log('Cron started at', new Date().toISOString());
        await removeOldTokens();
        console.log('Cron finished at', new Date().toISOString());
    });
};
