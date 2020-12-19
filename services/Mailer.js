const sendgrid = require('sendgrid');
// const { mail } = sendgrid;
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, emailContent ) {
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email("shuvamnandi9@gmail.com");
        this.subject = subject;
        
        this.body = new helper.Content("text/html", emailContent);
        this.recipients = this.formatAddresses(recipients); // helper function written by us

        this.addContent(this.body); // call SendGrid Mail's in-built function
        this.addClickTracking();    // helper function written by us to enable click tracking on sendgrid
        this.addRecipients();       // helper function written by us
    }

    formatAddresses(recipients){
        return recipients.map(({email}) => {
            return new helper.Email(email); // convert string of email from recipients object to a sendgrid Email object
        });
    }

    addClickTracking(){
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking();

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);         // call SendGrid Mail's in-built function
    }

    addRecipients(){
        const personalize = new helper.Personalization();

        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
            personalize.addCc(this.from_email);
        });
        this.addPersonalization(personalize);               // call SendGrid Mail's in-built function
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });
        console.log("Request created: ", request)
        const response = await this.sgApi.API(request);
        console.log("Response received: ", response)
        return response;
    }
}

module.exports = Mailer;