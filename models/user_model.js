const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true
    },
    email:{
        type:String,
        required: true
    },
    password :{
        type:String,
        required:true
    },
    profileImage:{
        type: String,
        default : "https://images.unsplash.com/photo-1717869885094-4a6f55df8154?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNnx8fGVufDB8fHx8fA%3D%3D"
    }
});

mongoose.model("UserModel", userSchema);