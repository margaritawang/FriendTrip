const express = require('express');
const router = express.Router();
require('dotenv').config();


module.exports = () => {
  router.get('/', (req, res) => {
    console.log("here");
    return res.send('ok');
  })
  return router;
}
