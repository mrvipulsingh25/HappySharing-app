require('dotenv').config();
// const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');

function connectDB() {
    // Database connection
    const DB_URL = process.env.MONGO_CONNECTION_URL;
    
    mongoose.connect(DB_URL, 
    { useNewUrlParser: true, 
    useUnifiedTopology: true});
   
    const connection = mongoose.connection;

    connection.on('error',function(err) {
        console.log("Database Not Connected");
    }).once('open',function() {
       console.log('Database Connected.');
    });
}

module.exports=connectDB;