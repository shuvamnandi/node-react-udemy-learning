const mongoose = require('mongoose');
// const Schema = mongoose.Schema; // Same as below
const { Schema } = mongoose; // Same as above, ES5 syntax

const recipientSchema = new Schema({
	email: String,
	responded: { type: Boolean, default: false }
});

module.exports = recipientSchema;