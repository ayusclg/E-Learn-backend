import nodemailer from 'nodemailer'


const transport = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"",
        pass:""
    }
})

const sendMail = async function (to,subject,text,html) {
    try {
        const mailOptions = {
            from:user,
            to,
            subject,
            text,
            html,
    
        }
        const responsE = await transport.sendMail(mailOptions)
        console.log(responsE.response)
        return responsE;
    } catch (error) {
        console.log("error in sending mail",error)
    }
    
}
export {sendMail}