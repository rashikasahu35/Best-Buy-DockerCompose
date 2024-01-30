const nodemailer = require("nodemailer");

const sendEmail = async ({ email, subject, message }) => {
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.SMPT_HOST,
            port: process.env.SMPT_PORT,
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.ADMIN_EMAIL_ID,
                pass: process.env.ADMIN_EMAIL_PASSWORD,
            },
        });
    
        // Define email options
        const mailOptions = {
            from: process.env.ADMIN_EMAIL_ID,
            to: email,
            subject: subject,
            text: message,
        };
        const response = await transporter.sendMail(mailOptions)
    }
    catch(err){
        console.log(err)
    }

}

module.exports = sendEmail