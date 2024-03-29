const asyncHandler = require("express-async-handler");
const { Error } = require("mongoose");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");


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
        fileDate={
            fileName: req.file.originalname,
            filePath: req.file.path,
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

module.exports={
    createProduct,
}