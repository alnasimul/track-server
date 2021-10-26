require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes =  require('./routes/authRoutes');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);


app.get('/', (req,res) => {
    res.send('Hi there!')
});


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.66naq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(uri);

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance')
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo', err);
});

app.listen(4000, () => {
    console.log('server is ready!')
})