const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the structure of the objects within the order_data array


const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array,
        required: true,
    }
});

module.exports = mongoose.model('order', OrderSchema);