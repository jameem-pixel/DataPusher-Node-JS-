const express = require('express')
const mongoose = require('mongoose')
const url = `mongodb+srv://Jameem:ymjpk123@cluster0.l3wkzdl.mongodb.net/?retryWrites=true&w=majority`;
const app = express()

const connectionParams ={
    useNewUrlParser: true,
    useUnifiedTopology:true,
}

mongoose.connect(url, connectionParams)

const con = mongoose.connection
con.on('open', () => {
    console.log('Connected to DB')
})

app.use(express.json())

const accountRouter = require('./routers/accounts')
app.use('/accounts', accountRouter)

const destinationRouter = require('./routers/destinations')
app.use('/destinations', destinationRouter)

const serverRouter = require('./routers/server')
app.use('/server/incoming_data/', serverRouter)

app.listen(8000, () => {
    console.log('Server started')
})