const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://harrydukehd1:MxeQvOk23v61WHjp@cluster0.gqvaohe.mongodb.net/";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (ex) {
        console.error('Error connecting to MongoDB', ex);
    }
}

function getDB() {
    return client.db('myDatabase');
}

module.exports = { connectDB, getDB };