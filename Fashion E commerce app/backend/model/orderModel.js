import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema  = new Schema({
    userId:{
        type:String,
        required:true
    },
     items:{
        type:Array,
        required:true
    },
     amount:{
        type:Number,
        required:true
    },
     address:{
        type:Object,
        required:true
    },
     status:{
        type:String,
        required:true,
        default:'Order placed'
    },
     paymentMethod:{
        type:String,
        required:true
    },
     payment:{
        type:Boolean,
        required:true,
        default:false
    },
     date:{
        type:Number,
        required:true
    },
})

const Order = mongoose.model('Order',orderSchema);

export default Order;