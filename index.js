const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const consign = require('consign');

require('dotenv').config();

const PORT = process.env.PORT || 3001;

const whiteList = [process.env.URL1, process.env.URL2];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

consign({ cwd: 'src' })
  .then('database/index.js')
  .then('middleware')
  .then('controllers')
  .then('routes')
  .into(app);

app.listen(PORT, () => {
  console.log('Backend...');
});
