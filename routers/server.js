const express = require('express')
const router = express.Router()
const Account = require('../models/account')
const Destination = require('../models/destination')
const http = require('http');




router.post('/', async(req, res) =>{
    
    if('cl-x-token' in req.headers){
        const account = await Account.findOne({app_secret_token: req.headers['cl-x-token']})
        const destinations = await Destination.find({account_id:account.id})
        destinations.forEach(function(destination){
            destination_url = destination.destination_url
            http_method = destination.http_method
            headers = destination.headers
            data = req.body
            if(http_method == 'POST' || http_method == 'post'){
                PostData(destination_url, headers, data)
            }else{
                GetData(destination_url, headers, data)
            }

        })
        res.send('Completed')
    }else{
        res.send('Something Went Wrong')
    }
})


function PostData(destination_url, destination_headers, data){
    const postData = JSON.stringify(data);
    const options = {
        url: destination_url,
        method: 'POST',
        headers: destination_headers
    };

    const req = http.request(options, (res) => {
        console.log(res)
    })
}

function GetData(destination_url, destination_headers, data){
    const getData = JSON.stringify(data);
    const options = {
        url: destination_url,
        method: 'GET',
        headers: destination_headers
    };

    const req = http.request(options, (res) => {
        console.log(res)
    })
}
  
module.exports = router