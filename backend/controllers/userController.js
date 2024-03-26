//évitezd'écrire explicitement un bloc try-catch 
//dans chaque route qui utilise des opérations asynchrones
const asyncHandler= require("express-async-handler");
const User=require("../models/userModel");

const registerUser = asyncHandler( async (req, res) => {
    const {name,email,password}= req.body

    //validation
    if(!name || !email || !password){
        res.status(400)
        throw new Error("please fill in all required fields")
    }
    if(password.length <6){
        res.status(400)
        throw new Error("password must be up to 6 charcters")
    }
    //check if user email already exists
     const userExists= await User.findOne({email})

     if(userExists){
        res.status(400)
        throw new Error("Email has already been registered")
     }

     //Creat new user
     const user = await User.create({
        name,
        email,
        password
     })
 
     
     if(user){
        const {_id,name,email,photo,phone,bio}=user
        res.status(201).json({
            _id,name,email,photo,phone,bio
        })
     }else{
        res.status(400)
        throw new Error("Invalid user data")
     }
});


module.exports = {
    registerUser,
};
