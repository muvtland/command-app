const express = require('express')
const redis = require('redis')
const client = redis.createClient(6379,'redis')
const bodyParser = require('body-parser')
const commandRoutes = require('./routes')

const app = express()
const cors = require('cors')

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/command', commandRoutes)


const PORT = process.env.PORT || 5000

client.on("error", function(error) {
    console.error(error)
})

client.on('connect', (error) => {
    if (!error){
        console.log('connected to redis db')
        app.listen(PORT, () => console.log(`Server started to port ${PORT}`))
    }
})




