const mongoose = require('mongoose');


const express = require('express');



const app = express();
app.use(express.json()); // Make sure it comes back as json

//mongoose.connect('mongodb://localhost/twitpin', {
    mongoose.connect('mongodb+srv://Anayte:12345@twitpin.sj7o8.gcp.mongodb.net/twitpin?retryWrites=true&w=majority', {
    //useCreateIndex: true,
    //useNewUrlParser: true,
    //useFindAndModify: false
    useNewUrlParser: true
})
 .then(db => console.log('DB is connect'))
 .catch(err => console.error(err));