
const express = require('express')
const router = express.Router()
const Destination = require('../models/destination')


module.exports = router


router.get('/', async(req,res) => {
    try{
        const destinations = await Destination.find()
        res.json(destinations)
    }catch(err){
        res.send('Error '+ err)
    }
})

router.post('/', async(req, res) =>{
    console.log(req.body)
    const destination = new Destination({
        account_id : req.body.account_id,
        destination_url : req.body.destination_url,
        http_method : req.body.http_method,
        headers : req.body.headers
    })
    try{
        const destination_1 = await destination.save()
        res.json(destination_1)
    }catch(err){
        res.send('Error '+ err)
    }
})

router.get('/:id', async(req,res) => {
    try{
        const destination = await Destination.findById(req.params.id)
        res.json(destination)
    }catch(err){
        res.send('Error '+ err)
    }
})

router.patch('/:id', async(req, res) => {
    try{
        const destination = await Destination.findById(req.params.id)
        destination.account_id = req.body.account_id,
        destination.destination_url = req.body.destination_url,
        destination.http_method = req.body.http_method,
        destination.headers = req.body.headers
        const destination_1 = await destination.save()
        res.send('Successfully Updated')
    }catch(err){
        res.send('Error '+ err)
    }
})

router.delete('/:id', async(req, res) => {
    try{
        const destination = await Destination.findById(req.params.id)
        await destination.delete()
        res.send('Successfully Deleted')
    }catch(err){
        res.send('Error '+ err)
    }
})