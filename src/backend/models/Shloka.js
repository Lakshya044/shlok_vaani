import mongoose from "mongoose" ; 

const CommentSchema = new mongoose.Schema({
  userId: {
    type : mongoose.Schema.Types.ObjectId ,
    required : true,
    ref : 'User'
  },
  userName:{
    type : String , 
    // required : true
  },
  text : {
    type : String , 
    // required : true
  },
  likes : [{type : mongoose.Schema.Types.ObjectId , ref : 'User'}],
  timestamp : {
    type : Date , 
    default : Date.now
  } 
});


const ShlokaSchema = new mongoose.Schema({
  scripture: {
    type : String , 
    required : true
  },
  bookNo : {
    type : String , 
    required : true
  },
  chapterNo : {
    type : Number , 
    required : true
  },
  shlokaNo : {
    type : Number , 
    required : true
  },
  text : {
    type : String , 
    required : true
  },
  likes : [{type : mongoose.Schema.Types.ObjectId , ref : 'User'}],
  comments : {
    type : [CommentSchema],
    default : []
  },
  commentCount : {
    type : Number , 
    default : 0
  }
  } , {timestamps : true}
);

ShlokaSchema.index({ scripture: 1, bookNo: 1, chapterNo: 1, shlokaNo: 1 });

const Shloka = mongoose.models.Shloka || mongoose.model("Shloka" , ShlokaSchema , 'ShlokVaani_Shlokas') ;
export default Shloka ;