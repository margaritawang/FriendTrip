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
const knexLogger = require('knex-logger');
const datahelper = require('./routes/datahelpers.js')(knex);
const usersRoutes = require("./routes/users");
const morgan = require('morgan');
const faceRoutes = require('./routes/face');

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser({urlencoded: true}));
app.use(morgan('tiny'));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.post('/api/login', (req, res) => {
  console.log('body------');
  console.log(req.body.email);
  console.log(req.body.password);
  knex.select("*").from('users').where({email: req.body.email}).then((data) => {
    if (!data.length){
      console.log('no user found');
      return res.status(400);
    } else if (bcrypt.compareSync(req.body.password, data[0].password)) {
      console.log('login success');
      req.session.user_id = data[0].id;
      console.log(req.session.user_id);
      //let user = {id: data[0].id}
      return res.json({ user_id: req.session.user_id });
    } else {
      console.log('wrong password');
      return res.send(401);
    }
  }).catch((error) => {
    console.log(error);
    return res.send(400);
  });

});

app.post('/api/register', (req, res) => {
  user = {
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    email: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10)
  };
  console.log(user);
  knex('users').insert(user).then(()=>{
    console.log("account created");
    return res.send(200);
  }).
  catch((err) => {
    return res.send(401);
  })
})

app.use("/api", usersRoutes(datahelper));
app.use('/api', faceRoutes());

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
})
