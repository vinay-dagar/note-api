const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const { ValidationError } = require('express-validation');

global.Mongoose = require('mongoose');
global.MongooseConnect = require('./configurations/config')(); 

app.use(cors());
app.use(bodyParser.json());

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE, PATCH');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
//     next();
// })

global.validation = require('./validations/todo');
global.router = express.Router();
global.app = app;

const routes = require('./configurations/routes');

app.use('/api/v1', routes)

app.get('/', (req, res, next) => res.status(200).send('Service is running!'));

app.use((error, req, res, next) => {
    console.error(error)
    if(error instanceof ValidationError) {
        return res.status(error.statusCode).json(error)
    }

    const status = error.statusCode || 500;
    const message = error.message || 'Something went wrong';

    return res.status(status).json({message})
})