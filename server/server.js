require('./config/config');
require('express-async-errors');

const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')


const app = express();

app.use(cors())
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use(require('./routes/auth'));
app.use(require('./routes/user'));


app.use((err, req, res, next) => {
    if (err.status ) {
      res.status(err.status);
      res.json({ error: err.message });
    }
    next(err);
  });


mongoose.connect(process.env.URLDB,{ useFindAndModify: false }, (err, res) => {

    if (err) throw err;

    console.log('Data base  ONLINE');

});



app.listen(process.env.PORT, () => {
    console.log('lisent port: ', process.env.PORT);
});