const cors = require("cors");
const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();

const uri = "mongodb+srv://harrydukehd1:MxeQvOk23v61WHjp@cluster0.gqvaohe.mongodb.net/";
const dbname = 'myDatabase'; 
const collectionName = 'users';

let usersCollection;

app.use(express.static('public'));
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3040', 'http://127.0.0.1:3040'] }));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

console.log('Starting server setup...');

async function runDBConnection() {
    try {
        await client.connect();
        const db = client.db('myDatabase');
        usersCollection = db.collection(collectionName);
        console.log(usersCollection);
    } catch(ex) {
        console.error(ex);
    }

    app.post("/signup", async (req, res) => {
        const { first_name, last_name, email, password } = req.body;
        try {
            const userExists = await usersCollection.findOne({ email: email.toLowerCase() });
            if (userExists) {
                return res.status(400).send({ message: "Email already exists." });
            }
            await usersCollection.insertOne({ first_name, last_name, email: email.toLowerCase(), password });
            return res.status(201).send({ message: "Sign Up Successful" });
        } catch (err) {
            console.error('Error occurred while signing up:', err);
            return res.status(500).send({ message: "Error occurred while signing up." });
        }
    });
}

const port = process.env.PORT || 3040;
app.listen(port, ()=>{
    console.log('express server started');
    runDBConnection();
});