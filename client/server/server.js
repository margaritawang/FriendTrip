
const PORT = process.env.PORT || 3000;
const ENV = process.env.ENV || 'development';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');

const faceRoutes = require('./routes/face');

app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({
  extended: true
}));

// mount all resource faceRoutes
app.use('/api', faceRoutes());

app.get('/', (req, res) => {
  return res.send(200);
})


app.listen(PORT, () => {
  console.log("listeing " + PORT);
})
