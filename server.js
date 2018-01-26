require('dotenv').config();

const PORT = process.env.PORT || 3000;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// const cookieParser  = require('cookie-parser');
// const cookieSession = require('cookie-session');

const knexConfig = require("./knexfile");
//const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');
// const datahelper = require('./routes/datahelpers.js')(knex);

const usersRoutes = require("./routes/users");

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/api", usersRoutes());

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
})
