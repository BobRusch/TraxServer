require('./models/User.model.js');
require('./models/Track.model.js');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth.routes');
const trackRoutes = require('./routes/track.routes');
const requireAuth = require('./middleware/requireAuth.middleware');

const port = process.env.DBPORT || 3000;

const mongoUri = process.env.DBURL;

mongoose.connect(mongoUri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on('connected', () => {
  console.log('Mongo connect ==> Successful');
});
mongoose.connection.on('error', (err) => {
  console.log(`Mongo connect error ==> ${err}`);
});

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

app.get('/', requireAuth, (req, res) => {
  res.status(200).send(`Welcome back ${req.user.email}!!!!`);
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
