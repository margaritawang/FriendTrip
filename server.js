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
  knex.select("*").from('users').where({email: req.body.email}).then((data) => {
    if (!data.length){
      return res.status(400);
    } else if (bcrypt.compareSync(req.body.password, data[0].password)) {
      console.log('login success');
      req.session.user_id = data[0].id;
      console.log(req.session.user_id);
      return res.status(200);
    } else {
      console.log('wrong password');
      return res.status(401);
    }
  }).catch((error) => {
    console.log(error);
    return res.status(400);
  });
  
});

app.post('/register', (req, res) => {
  user = {
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  };
  console.log(user);
  return knex('users').insert(user).then(()=>{
    res.status(200);
  });
})

app.use("/api", usersRoutes(datahelper));

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
})
