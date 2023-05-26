const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://FitnRunAdmin:fitnrunadmin420@fitnruncluster.hsocs29.mongodb.net/?retryWrites=true&w=majority');

// Notes from Geneparmigiano: Need to make sure IP's can connect from anywhere for that access (MongoAtlas)

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/FitnRun');

module.exports = mongoose.connection;

// notes for twqueen
// useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer supported options. Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false. Please remove these options from your code.
// https://jasonwatmore.com/mongoose-mongodb-fix-for-mongoparseerror-options-usecreateindex-usefindandmodify-are-not-supported
