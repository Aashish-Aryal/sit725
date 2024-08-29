const userModel = require('../models/userModel');

async function signup(req, res) {
    const { first_name, last_name, email, password } = req.body;
    try {
        const existingUser = await userModel.getAllUsers();
        if (existingUser.some(user => user.email.toLowerCase() === email.toLowerCase())) {
            return res.status(400).send({ message: "Email already exists." });
        }
        await userModel.createUser({ first_name, last_name, email: email.toLowerCase(), password });
        return res.status(201).send({ message: "Sign Up Successful" });
    } catch (err) {
        return res.status(500).send({ message: "Error occurred while signing up." });
    }
}

async function getUsers(req, res) {
    try {
        const users = await userModel.getAllUsers();
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send({ message: "Error fetching users." });
    }
}

async function deleteUser(req, res) {
    const { email } = req.body;
    try {
        await userModel.deleteUser(email);
        res.status(200).send({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: "Error deleting user." });
    }
}

module.exports = { signup, getUsers, deleteUser };
