const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const template = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get( '/api/surveys/thanks', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post( '/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title, 
            subject,
            body,
            recipients: recipients.split(',').map(email=> ({email})),
            _user: req.user.id,
            dateSent: Date.now()
        });

        // Great place to send an email
        const mailer = new Mailer(survey, template(survey));

        try {
            await mailer.send();
            try {
                await survey.save();
                req.user.credits -= 1; // charge user for sending a new survey campaign email
                const user = await req.user.save(); // update credits on MongoDB
                res.send(user);
            } catch(error){
                res.status(423).send(error); // 423 status code means error in saving survey
            }
        } catch (error) {
            res.status(422).send(error); // 422 status code means user made some mistake in sending data (error in sending email)
        }
    });
};