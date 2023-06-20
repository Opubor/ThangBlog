const mongoose = require ('mongoose')

async function connectDB(){
    try {
        // Add your database URL here EXAMPLE
        return await mongoose.connect(process.env.MONGO_URL)
    } catch{
        console.log('Database Connection Error')
    }
}

module.exports = connectDB