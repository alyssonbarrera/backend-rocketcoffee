const productSchema = require('../models/productSchema');
const orderSchema = require('../models/orderSchema');
const cloudinary = require('../utils/cloudinary')
const upload = require("../utils/multer")
const path = require("path")

const getAll = async (req, res) => {
    productSchema.find((error, products) => {
        error ? res.status(500).send(error) : res.status(200).send(products);
    })
}

const createProduct = async (req, res) => {
    try {
        const image = await cloudinary.uploader.upload(req.file.path);
        const imageURL = image.url;

        const newProduct = new productSchema({
            productImage: imageURL,
            productImageId: image.public_id,
            productName: req.body.productName,
            productDescription: req.body.productDescription,
            productQuantity: req.body.productQuantity
        });

        const savedProduct = await newProduct.save();

        res.status(200).send({
            message: "Produto criado com sucesso!",
            savedProduct,
            image
        });

    } catch (error) {
        res.status(500).send({
            message: "Erro ao criar produto",
            error
        });
    }
}

const updateProductClient = async (req, res) => {
    try {

        const productFound = await productSchema.findByIdAndUpdate(req.params.id, {$inc: {productQuantity: -req.body.productQuantity}});

        const newOrder = new orderSchema({
            productImage: productFound.productImage,
            productName: productFound.productName,
            productDescription: productFound.productDescription,
            productQuantity: req.body.productQuantity,
            createdAt: new Date()
        })

        await newOrder.save();

        res.status(200).send({
            message: `Produto ${productFound.productName} atualizado com sucesso!`,
            currentQuantity: productFound.productQuantity - req.body.productQuantity
        })
        
    } catch (error) {
        res.status(500).send({
            message: "Erro ao atualizar produto",
            error
        });
    }
}
const updateProduct = async (req, res) => {
    try {

        if(req.file) {
            const image = await cloudinary.uploader.upload(req.file.path);
            const imageURL = image.url;

            await productSchema.findByIdAndUpdate(req.params.id, {
                productImage: imageURL,
                productImageId: image.public_id,
                productName: req.body.productName,
                productDescription: req.body.productDescription,
                productQuantity: req.body.productQuantity
            });

            await cloudinary.uploader.destroy(productFound.productImageId);
        }
        else {
            await productSchema.findByIdAndUpdate(req.params.id, {
                productName: req.body.productName,
                productDescription: req.body.productDescription,
                productQuantity: req.body.productQuantity
            });
        }


        res.status(200).send({
            message: `Produto atualizado com sucesso!`,
        })
        
    } catch (error) {
        res.status(500).send({
            message: "Erro ao atualizar produto",
            error
        });
    }
}

const productDelete = async (req, res) => {
    try {
        const productFound = await productSchema.findByIdAndDelete(req.body._id);

        res.status(200).send({
            message: `Produto ${productFound.name} deletado com sucesso!`,
        })
        
    } catch (error) {
        res.status(500).send({
            message: "Erro ao deletar produto",
            error
        });
    }
}

module.exports = {
    getAll,
    createProduct,
    updateProduct,
    updateProductClient,
    productDelete
}