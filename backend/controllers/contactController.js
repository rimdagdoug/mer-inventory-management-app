const expressAsyncHandler = require("express-async-handler");

const contactUs = expressAsyncHandler(async(req,res)=> {
  res.send("contact")
});

module.exports ={
    contactUs,
}