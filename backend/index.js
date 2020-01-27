const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost:27017/clotharoo')
mongoose.Promise = global.Promise;

app.use(cors());

app.use(express.static('public'));

app.use(express.json());

app.use('/api', require('./routes/api'));

app.use(function (err, req, res, next) {
    res.status(422).send({ error: err.message });
});

app.listen(4000, function () {
    console.log('Now listening for requests');
});