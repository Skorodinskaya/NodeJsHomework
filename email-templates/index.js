const emailActionEnum = require('../configs/email-actions.enum');

module.exports = {
    [emailActionEnum.CREATED]: {
        templateName: 'created',
        subject: 'Welcome!'
    },

    [emailActionEnum.UPDATED]: {
        templateName: 'updated',
        subject: 'CONGRATULATIONS!'
    },

    [emailActionEnum.DELETED]: {
        templateName: 'deleted',
        subject: 'Goodbye!'
    },


};
