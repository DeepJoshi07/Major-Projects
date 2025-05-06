import mongoose from "mongoose";
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  reciever: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    enum: ["like", "comment", "connectionAccepted"],
  },
  relatedUser: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  relatedPost: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },
},{timestamps:true});

const Notification = mongoose.model('Notification',notificationSchema)

export default Notification;