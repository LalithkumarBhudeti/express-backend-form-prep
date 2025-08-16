const { MongoClient } = require('mongodb');

let DBConnectionUrl = 'mongodb://127.0.0.1:27017'; // your local MongoDB server

const client = new MongoClient(DBConnectionUrl);

let DBConnection = async () => {
    await client.connect();
    console.log("✅ MongoDB connected successfully");

    // Return the database object so other files can use it
    return client.db("mongoDBProj_DataBase"); // replace with your DB name
}

module.exports = { DBConnection };
