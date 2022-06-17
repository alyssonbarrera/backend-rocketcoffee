const userSchema = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET

const login = (req, res) => {
    try {
        userSchema.findOne({ email: req.body.email }, (error, user) => {
            if(!user) {
                return res.status(401).send({
                    message: "User não encontrado",
                    email: `${req.body.email}`
                })
            }

            const validPassword = bcrypt.compareSync(req.body.password, user.password)

            if(!validPassword) {
                return res.status(401).send({
                    message: "Login não autorizado"
                })
            }

            const token = jwt.sign({ name: user.name }, SECRET)
            const userID = user._id

            res.status(200).send({
                message: "Login autorizado",
                token,
                userID
            })
        })
    } catch(e) {
        console.error(e)
    }
}

const checkToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Access denied!",
      });
    }

    try {
      const secret = process.env.SECRET;
      jwt.verify(token, secret);
      next();
    } catch (e) {
      return res.status(500).json({
        message: "Please enter a valid token!",
      });
    }
}

module.exports = {
    checkToken,
    login
}