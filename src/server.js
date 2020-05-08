const connectToDb = require('./db/db');
const app = require('./app');
const { PORT } = require('./common/config');

connectToDb(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
