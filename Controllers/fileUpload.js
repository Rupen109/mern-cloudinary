const File = require("../Models/File");
const cloudinary = require("cloudinary").v2;

//localfileupload --> handler function create karna hai!

exports.localFileUpload = async(req, res) => {
    try {
        //fetch file
        const file = req.files.file;
        console.log(file);

        let path = __dirname + "/files" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("path>>" + path);

        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success: true,
            message: "local file uploaded sucessfully",
        })

    }
    catch {
        
    }
}

function isFileTypeSupported(type, suppotedTypes) {
    return suppotedTypes.includes(type);
}
// console.log(suppotedTypes.includes(type));

async function uploadFileToCloudinary(file, folder) {
    const options = { folder };
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

// image upload ka handler

exports.imageUpload = async (req, res) => {
    try {
        //data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            })
        }

        //file format supported hai
        console.log("Uploading to Codehelp");
        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        //db me entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image Successfully Uploaded',
        })
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: 'Something went wrongg',
        });

    }
}


//videoupload

exports.videoUpload = async (req, res) => {
    try {
        //data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        console.log(file);


        //Validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        //add a upper limit for 5mb for videos 
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            })
        }


        //file format supported hai
        console.log("Uploading to Codehelp");
        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        //db me entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image Successfully Uploaded',
        })

    }
    catch(error) {
        res.status(400).json({
            success: true,
            message: "something bhayanakar happening",
        })
    }
}