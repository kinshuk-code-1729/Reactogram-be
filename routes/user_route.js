const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');

const mongoose = require("mongoose");
const UserModel = mongoose.model("UserModel");

router.post("/signup", (req, res) => {
    const {fullName, email, password, profileImage} = req.body;
    if(!fullName || !password || !email){
        return res.status(400).json({error : "One or more empty fields !!"});
    }
    UserModel.findOne({email : email})
    .then((userInDB) => {
        if(userInDB){
            return res.status(500).json({error:"This user email already exists"});
        }

        bcryptjs.hash(password, 16)
        .then((hashedPasssword) =>{
            const user = new UserModel({fullName, email, password : hashedPasssword, profileImage});
            user.save()
            .then((newUser) => {
                res.status(201).json({result : "User Signed Up Successfully !!"});
            })
        }).catch((err) =>{
            console.log(err);
        })

    })
    .catch((err) =>{
        console.log(err);
    })
});

router.post("/login", (req, res) => {
    const {email, password} = req.body;
    if(!password || !email){
        return res.status(400).json({error : "One or more empty fields !!"});
    }
    UserModel.findOne({email : email})
    .then((userInDB) => {
        if(!userInDB){
            return res.status(401).json({error:"Invalid Credentials !!"});
        }

        bcryptjs.compare(password, userInDB.password)
        .then((matched) =>{
            if(matched){
                return res.status(200).json({result:"User Logged in successfully"});
            }
            else{
                return res.status(401).json({error:"Invalid Credentials !!"});
            }
        }).catch((err) =>{
            console.log(err);
        })

    })
    .catch((err) =>{
        console.log(err);
    })
});



module.exports = router;