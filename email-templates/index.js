const emailActionEnum = require('../configs/email_actions_enum');

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

    [emailActionEnum.FORGOT_PASSWORD]: {
        templateName: 'forgot-password',
        subject: 'Password is forgotten!'
    },

    [emailActionEnum.NEW_PASSWORD]: {
        templateName: 'new-password',
        subject: 'You changed your password!'
    },


};
