require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const userRouter = require('./routes/app.routes.js');
const newsRouter = require('./routes/news.routes.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/', newsRouter);

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to DB successfully');
    app.listen(port, (err) => {
        if (err) {
            return console.log('Something bad happened', err);
        }
        console.log(`Server is listening on ${port}....`);
    });
}).catch(err => {
    console.log('Error in connecting to the DB: ', err);
});






module.exports = app;