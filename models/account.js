const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
     email:{
        type: String,
        required: true,
        unique: true
     },

     account_id:{
        type: String,
        required: true,
        unique: true
     },

     account_name:{
        type: String,
        required: true,
     },

     app_secret_token: {
        type: String,
        required: true
     },

     website: {
        type: String,
        required: false
     },

     created_on: { 
        type: Date, 
        default: Date.now 
    },

})


module.exports = mongoose.model('Account', accountSchema)