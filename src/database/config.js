const mongoose = require("mongoose");

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Banco conectado");
  } catch (error) {
    console.log("Error: ", error.message);
  }
};
module.exports = {
  connect,
};