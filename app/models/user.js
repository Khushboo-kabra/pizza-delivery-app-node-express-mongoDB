//database k andar jo table hai vo plural hai...
const mongoose = require('mongoose')
const Schema = mongoose.Schema // javascript mein kissi variable ka naam caps mein hai uska matlb hai ki vo class hai ya constrution func...


const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    role: {type: String, default: 'customer'}
},{timestamps: true})

module.exports = mongoose.model('User',userSchema)