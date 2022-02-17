const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/schema');

const app = express();

// connect to database
mongoose.connect(process.env.MOONGO_DB_URI);
mongoose.connection.once('open', () => {
    console.log('connected to database');
});

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running at port ${process.env.SERVER_PORT}.`);
});

