const {MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
console.log(process.env);
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectToMongo() {
    try {
        await client.connect();

        await client.db("admin").command({ ping: 1});
        console.log("Successfully connected to Mongo");
    } catch (err) {
        console.error("Error to connect to MongoDB:", err);
    } finally {
        await client.close();
    }
}

module.exports = { connectToMongo };