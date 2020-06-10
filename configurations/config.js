const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const domain = require('../models/index');

global.domain = domain;

const initApp = () => {
    app.listen(process.env.PORT, () => {
        console.log(`Express server starting at port ${process.env.PORT} in ${process.env.NODE_ENV}`)
    })
};

module.exports = () => {
    dotEnv.config({
        path: `${__dirname}/../env/${process.env.NODE_ENV}.env`
    })
    mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
    mongoose.set('debug', true)

    const db = mongoose.connection;
    db.on('error', (err) => {
        console.error(err)
    });

    
    db.on('open', () => {
        console.log('Database connected!')
        initApp()
    })

    return db
};