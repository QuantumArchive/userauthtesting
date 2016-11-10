const mongoose = require('mongoose');

// Our URI pointing to our database
const dbURI = process.env.MONGODB_URI || 'mongodb://QuantumArchive:223codefellows@ds051943.mlab.com:51943/testinguserauth' || 'mongodb://localhost/testinguserauth';

mongoose.Promise = Promise;
mongoose.connection(dbURI);

// Connection Events
// When successfully connected
mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});

//If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

module.exports = mongoose.connection;