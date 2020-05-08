const { connect, connection } = require('mongoose');

const { MONGO_CONNECTION_STRING } = require('../common/config');

const connectToDb = callback => {
  connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });

  connection.on('error', console.error.bind(console, 'connection error:'));
  connection.once('open', () => {
    console.log('Connected to DB');
    callback();
  });
};

module.exports = connectToDb;
