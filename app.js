const express = require('express');
const app = express();
const port = 3000;
const appRouter = require('./routes/app.routes.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', appRouter);

// app.listen(port, (err) => {
//     if (err) {
//         return console.log('Something bad happened', err);
//     }
//     console.log(`Server is listening on ${port}....`);
// });



module.exports = app;