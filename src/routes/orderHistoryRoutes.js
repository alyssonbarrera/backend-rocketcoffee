const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

router.get("/", authController.checkToken, orderController.getAll);
router.delete("/", orderController.deleteAll);

module.exports = router;