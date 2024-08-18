const dbConnection = require('../dbConnection');

async function createUser(userData) {
    const db = dbConnection.getDB();
    const usersCollection = db.collection('users');
    await usersCollection.insertOne(userData);
}

async function getAllUsers() {
    const db = dbConnection.getDB();
    const usersCollection = db.collection('users');
    return usersCollection.find({}).toArray();
}

async function deleteUser(email) {
    const db = dbConnection.getDB();
    const usersCollection = db.collection('users');
    await usersCollection.deleteOne({ email });
}

module.exports = { createUser, getAllUsers, deleteUser };
