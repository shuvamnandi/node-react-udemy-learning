const mongoose = require('mongoose');

// const Schema = mongoose.Schema; // Same as below
const { Schema } = mongoose; // Same as above, ES5 syntax

const userSchema = new Schema( {
	googleId: String,
	googleDislayName: String,
	givenName: String,
	familyName: String,
	age: Number, 
});

mongoose.model('users', userSchema); // Loads the schema into Mongoose

