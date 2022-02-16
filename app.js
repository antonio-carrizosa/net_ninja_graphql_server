const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema')

const app = express();


// connect to database
mongoose.connect("mongodb+srv://admin:tVGOLZJLyx9hlwZl@cafeapp.ixgr5.mongodb.net/graphql");
mongoose.connection.once('open', () => {
    console.log('connected to database');
});

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log("Server running at port 4000.");
});

