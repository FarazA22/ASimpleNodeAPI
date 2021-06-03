const app = require('./app');
const db = require('./Model/database');

const port = process.env.PORT || 3000; // --> Setting up Port variable

// LISTENER
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
