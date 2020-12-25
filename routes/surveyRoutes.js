const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const sgMail = require('../services/sendgridMailer');
const template = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get( '/api/surveys/:surveyId/:choice"', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.get( '/api/surveys/', async (req, res) => {
        const surveys = await Survey.find({_user: req.user.id})
                                    .select({recipients: false});
        res.send(surveys);
    });

    app.post( '/api/surveys/webhook', (req, res) => {
        console.log(req.body);
        res.send({}); // dummy response to not keep sendgrid hanging, otherwise it will keep retrying and sending more notifications for same events
    });

    app.post( '/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;
        console.log("New survey creation requested: ", req.body);
        const survey = new Survey({
            title, 
            subject,
            body,
            recipients: recipients.split(',').map(email=> ({email})),
            _user: req.user.id,
            dateSent: Date.now(),
            dateLastResponded: undefined
        });

        // Great place to send an email
        // const mailer = new Mailer(survey, template(survey));

        try {
            await sgMail( survey, template(survey));
            try {
                await survey.save();
                req.user.credits -= 1; // charge user for sending a new survey campaign email
                const user = await req.user.save(); // update credits on MongoDB
                res.send(user);
            } catch(err){
                res.status(423).send(err); // 423 status code means error in saving survey
            }
        } catch (err) {
            res.status(422).send(err); // 422 status code means user made some mistake in sending data (error in sending email)
        }
    });
};