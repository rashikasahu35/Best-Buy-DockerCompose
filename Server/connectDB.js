const mongoose = require('mongoose')

// connect to DB
const connection = async () => {
    const reponse = await mongoose.connect(process.env.MONGODB_URI)
    console.log("connected to db")
}

module.exports = connection