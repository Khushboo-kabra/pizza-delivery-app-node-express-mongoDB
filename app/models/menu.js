//database k andar jo table hai vo plural hai...
const mongoose = require('mongoose')
const Schema = mongoose.Schema // javascript mein kissi variable ka naam caps mein hai uska matlb hai ki vo class hai ya constrution func...


const menuSchema = new Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    size: {type: String, required: true}
})

module.exports = mongoose.model('Menu',menuSchema)