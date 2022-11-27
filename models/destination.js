const mongoose = require('mongoose')

const destinationSchema = new mongoose.Schema({
     account_id:{
        type: String,
        required: true
     },

     destination_url:{
        type: String,
        required: true
     },

     http_method:{
        type: String,
        required: true,
     },

     headers: {
        type: Object,
        required: false
     },

     created_on: { 
        type: Date, 
        default: Date.now 
    },

})

module.exports = mongoose.model('Destination', destinationSchema)