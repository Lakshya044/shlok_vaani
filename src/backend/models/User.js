import mongoose from "mongoose" ;

const emailRegexSimple = /^\S+@\S+\.\S+$/ ;

const UserSchema = new mongoose.Schema({
    name : {
        type : String , 
        required : [true , "Please enter your Name..."]
    },
    email : {
        type : String , 
        required: true , 
        unique : true ,
        match : [emailRegexSimple , "Please use a valid email address"]
    },
    password : {
        type : String ,
        required : [true , "Please enter a valid password..."]
    },
    authProvider : {
        type : String , 
        enum : ["email" , "google"] , 
        default : "email" 
    },
    bookmarks : [{
        type : mongoose.Schema.Types.ObjectId , ref : "Shloka"
    }]
    } , {timestamps : true}

);

export default mongoose.models.User || mongoose.model("User" , UserSchema , 'ShlokVaani_Users') ;