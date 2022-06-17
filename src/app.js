const express = require('express');
const app = express();
const cors = require('cors');

require("dotenv-safe").config();

const db = require('./database/config');
db.connect();

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderHistoryRoutes = require('./routes/orderHistoryRoutes');

app.use('/', (req, res) => {
    res.send('Hello World!');
})
app.use('/auth', userRoutes)
app.use('/products', productRoutes);
app.use('/orders', orderHistoryRoutes);

module.exports = app