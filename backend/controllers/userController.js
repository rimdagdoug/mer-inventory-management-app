//évitezd'écrire explicitement un bloc try-catch 
//dans chaque route qui utilise des opérations asynchrones
const asyncHandler= require("express-async-handler");
const User=require("../models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt=require("bcryptjs");
const { use } = require("../routes/userRoute");


const  generatToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn: "1d"})
};

//register user
const registerUser = asyncHandler( async (req, res) => {
    //utilise asyncHandler pour gérer les erreurs asynchrones dans la fonction
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
        password,
     });

      //Generate token
      const token=generatToken(user._id)

      //send HTTP-only cookie
      res.cookie("token", token,{
        path:"/",
        httpOnly: true,
        expires:new Date(Date.now( )+ 1000 * 86400), //1 day
        sameSite: "none",
        secure:true
      });
 

     if(user){
        const {_id,name,email,photo,phone,bio}=user
        res.status(201).json({
            _id,name,email,photo,phone,bio,token,
        })
     }else{
        res.status(400)
        throw new Error("Invalid user data")
     }
});


//login user
const loginUser =asyncHandler (async (req,res) => {
   const {email,password}=req.body
   //validation request
   if(!email || !password){
        res.status(400);
        throw new Error("please add email and password");
   }

   //check if user exists
   const user = await User.findOne({email})
   if(!user){
    res.status(400);
    throw new Error("User not found, please signup");
    }

    //User exist,check if password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    //Generate token
    const token=generatToken(user._id)

    //send HTTP-only cookie
    res.cookie("token", token,{
      path:"/",
      httpOnly: true,
      expires:new Date(Date.now( )+ 1000 * 86400), //1 day
      sameSite: "none",
      secure:true
    });

    if (user && passwordIsCorrect) {
        const {_id,name,email,photo,phone,bio}=user;
        res.status(200).json({
            _id,name,email,photo,phone,bio,token
        });
    }else{
        res.status(400);
        throw new Error("invalid email or password");
    }

});

const logout = asyncHandler(async(req,res) => {
    res.cookie("token", "",{
        path:"/",
        httpOnly: true,
        expires:new Date(0), 
        sameSite: "none",
        secure:true
      });
      return res.status(200).json({message: "Successfully logged out"});
});

//get user data
const getUser= asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);

    if(user){
        const {_id,name,email,photo,phone,bio}=user
        res.status(200).json({
            _id,name,email,photo,phone,bio,
        })
     }else{
        res.status(400)
        throw new Error("user not found");
     }
});

//get login status
const loginStatus= asyncHandler(async(req,res)=>{
    res.send("loggedin");
});

module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser,
    loginStatus
};
