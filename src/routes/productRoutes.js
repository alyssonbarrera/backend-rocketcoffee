const express = require('express');
const router = express.Router();
const upload = require("..//utils/multer")

const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

router.get('/', productController.getAll);
router.post('/', authController.checkToken, upload.single("image"), productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/', authController.checkToken, productController.productDelete);

module.exports = router