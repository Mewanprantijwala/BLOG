const { default: mongoose } = require("mongoose");

require('dotenv').config()

function dbconfig() {
    mongoose.connect('mongodb+srv://mewan:mewan_chhipa@cluster0.o2vjqeu.mongodb.net/')
        .then(() => console.log("connected!!! ✌️"))
        .catch((err) => console.log(err));
}

module.exports = dbconfig;         