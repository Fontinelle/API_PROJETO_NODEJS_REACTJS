const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const consign = require('consign');

require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

consign({ cwd: 'src' })
  .then('database/index.js')
  .then('controllers')
  .then('routes')
  .into(app);

app.listen(PORT, () => {
  console.log('Backend...');
});
