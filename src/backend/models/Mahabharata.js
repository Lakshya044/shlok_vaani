import mongoose from "mongoose" ; 

const MahabharataSchema = new mongoose.Schema({
    book : {
        type : String,
    },
    chapter : {
        type : String,
    },
    shloka : {
        type : String,
    },
    text : {
        type : String,
    },
    likes : {
        type : Number,
        default : 0 
    },
    bookmark : {
        type : Boolean,
        default : false  
    },
    commentCount : {
        type : Number,
        default : 0
    },
    comments : [
        {
            userId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User",
                required : true 
            },
            text : {
                type : String,
                required: true
            },
            timestamp : {
                type : Date,
                default : Date.now,
            }
        }
    ]
});

export default mongoose.models.Mahabharata || mongoose.model("Mahabharata" , MahabharataSchema) ; 