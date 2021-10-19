const emailActionEnum = require('../configs/email-actions.enum');

module.exports = {
    [emailActionEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome!'
    },
    [emailActionEnum.ORDER_CONFIRMED]: {
        templateName: 'order.confirmed',
        subject: 'Cool!'
    },

    [emailActionEnum.USER_BLOCKED]: {
        templateName: 'us-b',
        subject: 'Hi!'
    },
};
