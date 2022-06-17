const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
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
        type: String
    }
});

module.exports = mongoose.model("order", orderSchema);