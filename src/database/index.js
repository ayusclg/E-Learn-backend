import mongoose from "mongoose";
import dotenv from 'dotenv'


dotenv.config("./.env")

const dbConnect = async()=>{
    try {
        const mongoConnection = await mongoose.connect(`${process.env.DB}`)
        console.log("Database Connected ",mongoConnection.connection.host)
    } catch (error) {
        console.log("error in database connection ",error)
        process.exit(1)
    }
}
export default dbConnect