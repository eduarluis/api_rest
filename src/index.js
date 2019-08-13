// Dependencies
const express = require('express');
const morgan = require('morgan');

// App
const app = express();

// Settings
app.set('port', process.env.PORT || 3001);
app.set('json spaces', 2);

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded( { extended: false } ));
app.use(express.json());

//Acceso a la Api desde Otras Apps
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Routes
app.use('/api/tasks/',require('../routes/index'));

// listen Server
app.listen(app.get('port'), () => {
    console.log(`Server on Port ${app.get('port')}`);
})

//hola wey