const express = require('express');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./models');

app.use('/books', require('./routes/books'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

db.sequelize.sync().then(() => {
  console.log(`Connected to the database`);
  app.listen(PORT, () => {
    console.log(
      `=========================\nServer listening on ${PORT}\n=========================`
    );
  });
});
