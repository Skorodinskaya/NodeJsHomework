const EmailTemplate = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');
const {ErrorHandler, WRONG_TEMPLATE} = require('../errors');

const {NO_REPLY_EMAIL_PASSWORD, NO_REPLY_EMAIL} = require('../configs');
const allTemplates = require('../email-templates');

const templateParser = new EmailTemplate({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NO_REPLY_EMAIL,
        pass: NO_REPLY_EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const templateInfo = allTemplates[emailAction];

    if (!templateInfo) {
        throw new ErrorHandler(WRONG_TEMPLATE.message, WRONG_TEMPLATE.status);
    }

    const html = await templateParser.render(templateInfo.templateName, context);

    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject: templateInfo.subject,
        html
    });
};

module.exports = {
    sendMail
};
