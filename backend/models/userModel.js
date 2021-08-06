import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

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


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
  }

const User = mongoose.model('User',userSchema);

export default User;