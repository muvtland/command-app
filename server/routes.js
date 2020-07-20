const router = require('express').Router()
const specification = require('./config/specification.json')
const redis = require('redis')
const client = redis.createClient(6379, 'redis')
const util = require('util')

const getAsync = util.promisify(client.get).bind(client)
const lRangeASync = util.promisify(client.lrange).bind(client)
const lPopAsync = util.promisify(client.lpop).bind(client)
const delAsync = util.promisify(client.del).bind(client)
const exec = util.promisify(require('child_process').exec)


async function lsWithGrep(command) {
    try {
        const {stdout, stderr} = await exec(command)
        return stdout || stderr
    } catch (err) {
        console.error(err)
    }
}


router.get('/config', (req, res) => {
    console.log('accept')
    console.log(specification)
    res.json(specification)
})

router.post('/run', async (req, res) => {
    const num = req.body.input_num
    const text = req.body.input_text
    const commandName = Date.now().toString()
    const command = `sh start.sh ${num} '${text}' ./`

    client.set(commandName, command)
    client.rpush('commandList', commandName)

    try {
        let currentCommandName = await lRangeASync('commandList', 0, 0)
        let currentCommand = await getAsync(currentCommandName)

        const scriptRes = await lsWithGrep(currentCommand)
        const deletedName = await lPopAsync('commandList')
        await delAsync(deletedName)
        return res.json(scriptRes)

    } catch (e) {
        res.status(400).json(e.message)
    }
})

router.get('/queue', async (req, res) => {
    try {
        const queue = await lRangeASync('commandList', 0, -1)
        res.json(queue.length)
    } catch (e) {
        res.status(400).json(e.message)
    }
})


module.exports = router