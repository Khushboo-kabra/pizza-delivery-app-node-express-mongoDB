//database k andar jo table hai vo plural hai...
const mongoose = require('mongoose')
const Schema = mongoose.Schema // javascript mein kissi variable ka naam caps mein hai uska matlb hai ki vo class hai ya constrution func...


const orderSchema = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true          
    },

    items: {type: Object, required: true},
    phone:{type:String, required: true},
    address:{type:String, required: true},
    paymentType:{type:String, default: 'COD'},
    status:{type:String, default: 'order_placed'},
},{timestamps: true})

module.exports = mongoose.model('Order', orderSchema)