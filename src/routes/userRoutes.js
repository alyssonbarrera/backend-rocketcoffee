const express = require('express');
const router = express.Router();
const upload = require("..//utils/multer")

const controller = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/signup', upload.single("image"), controller.createUser);
router.post('/signin', authController.login);
router.get('/user/:id', controller.getUserById);
router.delete('/delete/:id', controller.deleteUserById);

module.exports = router