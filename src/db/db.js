const { connect, connection } = require('mongoose');

const { MONGODB_URI } = require('../common/config');

const connectToDb = callback => {
  connect(MONGODB_URI, {
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
