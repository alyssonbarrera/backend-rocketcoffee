const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    productImage: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productQuantity: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("product", productSchema);