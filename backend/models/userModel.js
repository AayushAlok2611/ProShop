import mongoose from "mongoose";

const userSchema =  new mongoose.Schema({
    name:{
        type:String,
        requied:true
    },
    email:{
        type:String,
        requied:true,
        unique:true
    },
    password:{
        type:String,
        requied:true
    },
    isAdmin:{
        type:Boolean,
        requied:true,
        default:false
    }
},{
    timestamps:true
})

const User = mongoose.model('User',userSchema);

export default User;