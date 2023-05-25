//create app
const express = require("express");
const app = express();

// PORT
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

//db se connection
const db = require("./Config/database");
db.connect();

//cloud se connect karlo
const cloudinary = require("./Config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mount 
const Upload = require("./Routes/FileUpload");
app.use("/api/v1/upload", Upload);

//activate server
app.listen(PORT, () => {
    console.log(`app is listening on ${PORT}`);
})



