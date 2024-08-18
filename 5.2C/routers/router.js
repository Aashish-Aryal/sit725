const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST request for signup
router.post('/signup', userController.signup);

// GET request to fetch all users
router.get('/users', userController.getUsers);

// DELETE request to delete a user
router.delete('/delete', userController.deleteUser);

module.exports = router;
