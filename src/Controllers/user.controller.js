import { Student } from "../Models/student"
import { User } from "../Models/user"
import { uploadCloud } from "../utils/Cloudinary"



const userReg = async(req,res)=>{
    try {
        const {firstName,lastName,address,email,password,school,phone} = req.body

        const userCheck = await User.findOne({email:email})
        if(userCheck){
            return res.status(404).json({
                message:"User Already Registered"
            })
        }
        const photo = `req.file/public/Student/${req.file.filename} `
        if(!photo){
            return res.status(404).json({
                message:"Photo not Found"
            })
        }
        
        const inCloud = await uploadCloud(photo)
        const createStudent = await Student.create({
            firstName,
            lastName,
            phone,
            address,
            school,
            email,
            password,
            studentPhoto:inCloud.secure_url,
        })

        const createdStudent = await Student.findById(createStudent._id).select("-password -refresh_token")
        if(!createdStudent){
            return res.status(401).json({
                message:"Student Not Created"
            })
        }

        res.status(201).json({
            message:"Student Sucessfully Created",
            data:createdStudent
        })
    } catch (error) {
        res.status(500).json({
            message:"Server Error In UserReg",
            error:error
        })
    }
}


const userLogin = async(req,res)=>{
    try {
        const {email,password} = req.body

        const user = await Student.findOne({email:email})
        if(!user){
            return res.status(403).json({
                message:"User Not Found"
            })
        }
        const passwordCheck = await isPasswordCorrect(password)
        if(!passwordCheck){
            return res.status(400).json({
                message:"Invalid Password"
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message:"Server Error In UserLogin"
        })
    }
}



export {userReg}