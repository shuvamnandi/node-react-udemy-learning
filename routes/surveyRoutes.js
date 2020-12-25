const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');                                         // available as part of NodeJS modules
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const sgMail = require('../services/sendgridMailer');
const template = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get( '/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.get( '/api/surveys/', async (req, res) => {
        const surveys = await Survey.find({_user: req.user.id})
                                    .select({recipients: false});
        res.send(surveys);
    });

    app.post( '/api/surveys/webhook', (req, res) => {
        // Using ES6 destructuring on the event object received as part of req.body
        const parser = new Path('/api/surveys/:surveyId/:choice');
        
        const events = _.chain(req.body)
            .map(({ email, url }) => {
                // pass in the pattern that we are trying to extract, colon followed string extracts information to an object with these keys
                // return null if a path does not have surveyId and choice
                const match = parser.test(new URL(url).pathname);
                // console.log(match); // Logs this: { surveyId: '5fe32c9097f5f5240b4e0dbf', choice: 'no' }
                if (match) {
                    // Use ES6 way to copy info from match object
                    // const clickInfo = {...match, email};
                    // console.log("Found click event from: ", clickInfo); // Logs this: { surveyId: '5fe32c9097f5f5240b4e0dbf', choice: 'yes', email: 'shuvam.codes@gmail.com' }
                    return {...match, email};
                }
            })
            .compact() // Filter out undefined elements
            .uniqBy('email', 'surveyId')
            .each( ({surveyId, email, choice}) => {
                Survey.updateOne({
                    _id: surveyId,                                      // safer to use _id, as Mongoose sometimes maps Mongo's _id to id field
                    recipients: {
                        $elemMatch: { email: email, responded: false }
                    }
                }, {
                    $inc: { [choice]: 1 },
                    $set: { 'recipients.$.responded': true },
                    dateLastResponded: Date.now()
                }).exec()
            })
            .value(); // Remove duplicate elements based on criteria
        console.log("Click notification events from sendgrid", events);
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