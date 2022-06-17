const userSchema = require('../models/userSchema');
const bcrypt = require('bcrypt');
const cloudinary = require('../utils/cloudinary')
const upload = require("../utils/multer")
const path = require("path")

const getAll = async (req, res) => {
    userSchema.find((error, user) =>{
        error ? res.status(500).send(error) : res.status(200).send(user);
    })
}

const getUserById = async (req, res) => {
    userSchema.findById(req.params.id, (error, user) =>{
        error ? res.status(500).send(error) : res.status(200).send(user);
    })
}

const createUser = async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    
    try {
        const image = await cloudinary.uploader.upload(req.file.path);
        const imageURL = image.url;

        const newUser = new userSchema({
            avatar: imageURL,
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        res.status(200).send({
            message: "Usuário criado com sucesso!",
            savedUser
        });

    } catch (error) {
        res.status(500).send({
            message: "Erro ao criar usuário",
            error
        });
    }
}

const deleteUserById = async (req, res) => {
    try {
        const userFound = await userSchema.findByIdAndDelete(req.params.id);

        res.status(200).send({
            message: `Usuário ${userFound.name} deletado com sucesso!`,
        })
        
    } catch (error) {
        res.status(500).send({
            message: "Erro ao deletar usuário",
            error
        });
    }
}

module.exports = {
    getAll,
    getUserById,
    createUser,
    deleteUserById
}