const mongoose = require('mongoose')


const connectDb = async (uri) => {
    try {
        await mongoose.connect(uri, {
            family: 4
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDb