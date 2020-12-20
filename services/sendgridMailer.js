const sendgridMail = require('@sendgrid/mail');
const keys = require('../config/keys');

sendgridMail.setApiKey(keys.sendGridKey);
 
module.exports = async ({ subject, recipients }, emailContent) => {
    const emailRequest = {
        from: keys.emailFrom,
        subject,
        html: emailContent,
        personalizations: recipients.map(recipient=> ({to: [recipient]}))
    }
 
    try {
        const result = await sendgridMail.send(emailRequest);
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}