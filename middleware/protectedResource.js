const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");

const mongoose = require("mongoose");
const { response } = require("express");
const UserModel = mongoose.model("UserModel");

module.exports = (req, res, next) => {
    const {authorization} = req.headers;
    // bearer
    if(!authorization){
        return response.status(401).json({error : "User not logged in !!!"});
    }
    
    const token = authorization.replace("Bearer ","");
    jwt.verify(token, JWT_SECRET, (error, payload) => {
        if(error){
            return response.status(401).json({error : "User not logged in !!!"});
        }
        const {_id} = payload;
        UserModel.findById(_id)
        .then((dbUser) => {
            req.user = dbUser;
            next();
        })
    });
} 