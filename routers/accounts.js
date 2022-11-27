const express = require('express')
const router = express.Router()
const Account = require('../models/account')


function generateUUID() {
    var d = new Date().getTime();
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;
        if(d > 0){
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


router.get('/', async(req,res) => {
    try{
        const accounts = await Account.find()
        res.json(accounts)
    }catch(err){
        res.send('Error '+ err)
    }
})

router.post('/', async(req, res) =>{
    console.log(req.body)
    const account = new Account({
        email : req.body.email,
        account_id : req.body.account_id,
        account_name : req.body.account_name,
        app_secret_token : generateUUID(),
        website : req.body.website,
    })
    try{
        const account_1 = await account.save()
        res.json(account_1)
    }catch(err){
        res.send('Error '+ err)
    }
})

router.get('/:id', async(req,res) => {
    try{
        const account = await Account.findById(req.params.id)
        res.json(account)
    }catch(err){
        res.send('Error '+ err)
    }
})

router.patch('/:id', async(req, res) => {
    try{
        const account = await Account.findById(req.params.id)
        account.email = req.body.email,
        account.account_id = req.body.account_id,
        account.account_name = req.body.account_name,
        account.app_secret_token = req.body.app_secret_token,
        account.website = req.body.website,
        await account.save()
        res.send('Successfully Updated')
    }catch(err){
        res.send('Error '+ err)
    }
})

router.delete('/:id', async(req, res) => {
    try{
        const account = await Account.findById(req.params.id)
        await account.delete()
        res.send('Successfully Deleted')
    }catch(err){
        res.send('Error '+ err)
    }
})

module.exports = router