import { Student } from "../Models/student"



const fetchUser = async (req, res) => {
    try {
        const user = await Student.findById(req.Student?._id) 
        if (user.isAdmin === false) {
            return res.status(403).json({
                message:"Access Denied"
            })
        }

        const page = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 2
        const lastName = req.query.lastName

        const userFilter = {}
        if (lastName) {
            userFilter.lastName = lastName
        }

        const fetchUser = await Student.find(userFilter).select("-password -refresh_token")
            .skip((page - 1) * perPage)
            .limit(perPage)
        
        
        const totalUser = await Student.countDocuments(userFilter)
        


        res.status(200).json({
            message: "User Fetched",
            Page: page,
            perPage:perPage,
            total: totalUser,
            user:fetchUser
        })
    } catch (error) {
        res.status(500).json({
            message:"Server Error in fetching User By Admin"
        })
    }
}