const {Schema, default:mongoose} = require('mongoose')

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
})

const User = mongoose.model('User', UserSchema)
module.exports = {User}