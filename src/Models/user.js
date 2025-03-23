import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    photo:{
        type:String,
        required:true
    },
    refresh_token:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    school:{
        type:String,
        required:true
    }
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
this.password =await bcrypt.hash(this.password,10)
next()
})
userSchema.method.isPasswordCorrect = async function(password){
    return bcrypt.compare(this.password,password)
}

export const User = mongoose.model("User",userSchema)