import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ShlokaSchema = new mongoose.Schema({
  shlokaNumber: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  bookmark: {
    type: Boolean,
    default: false,
  },
  comments: {
    type : [CommentSchema],
    default : [] 
  },
  commentCount: {
    type: Number,
    default: 0,
  },
});

const ChapterSchema = new mongoose.Schema({
  chapterNumber: {
    type: Number,
   
  },
  chapterTitle: {
    type: String,
  },
  shlokas: [ShlokaSchema], 
});

const ScriptureSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["Mahabharata", "Ramayan", "Bhagavad Gita", "Other"],
  },
  book: {
    type: String,
     
  },
  chapters: [ChapterSchema], 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Scripture ||
  mongoose.model("Scripture", ScriptureSchema, "ShlokVaani_Scripture");
