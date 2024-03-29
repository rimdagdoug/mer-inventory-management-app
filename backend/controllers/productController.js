const asyncHandler = require("express-async-handler");
const { Error } = require("mongoose");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

const createProduct = asyncHandler(async(req,res) => {
    const {name,sku,category,quantity,price,description}= req.body;

    //validation
    if (!name|| ! category || ! quantity || ! price || ! description) {
        res.status(400)
        throw new Error("please fill in all fields")
    }
    
    //handle image upload
    let fileDate = {}
    if (req.file) {

         //save image to cloudinary
        let uploadedFile;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {folder: "Pinvent App", resource_type: ""})
        } catch (error) {
            res.status(500)
            throw new Error("image could not be uploaded")
            
        }

        fileDate={
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2) ,
        }
    }

    // create product
    const product = await Product.create({
        user: req.user.id,
        name,
        sku,
        category,
        quantity,
        price,
        description,
        image:fileDate,

    });
    res.status(201).json(product)
});

//get all products
const getProducts = asyncHandler(async(req,res)=> {
    const products = await Product.find({user: req.user.id}).sort("-createdAt")
    res.status(200).json(products)
})

module.exports={
    createProduct,
    getProducts,
}