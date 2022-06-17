const orderSchema = require('../models/orderSchema');

const getAll = async (req, res) => {
    try {
        const orders = await orderSchema.find();
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    getAll
}