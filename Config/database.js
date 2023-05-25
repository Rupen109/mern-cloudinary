const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(console.log("DB ka connection successful"))
        .catch((error) => {
            console.log("Db Ka Connection Issue");
            console.log(error);
            process.exit(1);
        })
}