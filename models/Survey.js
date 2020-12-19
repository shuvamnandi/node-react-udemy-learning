const mongoose = require('mongoose');
// const Schema = mongoose.Schema; // Same as below
const { Schema } = mongoose; // Same as above, ES5 syntax
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema( {
	title: String,
	body: String,
	subject: String,
	recipients: [RecipientSchema], // array of RecipientSchema objects
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'User' }, // hold reference to a user ID
    dateSent: Date,
    dateLastResponded: Date
});

mongoose.model('surveys', surveySchema); // Loads the schema into Mongoose

