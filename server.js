require('dotenv').config();

const PORT = process.env.PORT || 3000;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cookieParser  = require('cookie-parser');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');
const datahelper = require('./routes/datahelpers.js')(knex);

const usersRoutes = require("./routes/users");

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.post('/login', (req, res) => {
  user = knex('user').where('email', req.body.email);
  if (!user) {
    return res.status(404);
  } else if (!bcrypt.compareSync(user.password, req.body.password)){
    return res.status(401);
  } else {
    req.session.user_id = user.id;
  }
});

app.post('/register', (req, res) => {
  user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  };

  return knex('user').insert(user);
})

app.use("/api", usersRoutes(datahelper));

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
})
