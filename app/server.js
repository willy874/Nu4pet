const express = require('express')
require('colors')
const SocketServer = require('ws').Server
const createRoute = require('./router')
const app = express()
const port = 3000

app.use(express.static('dist'))
const Route = createRoute(app)

const wss = new SocketServer({
    server: app.listen(port, () => {
        console.log('Server app listening at',`http://localhost:${port}/dist/home.html`.blue)
        console.log('Server API test',`http://localhost:${port}/api/pet`.blue)
    })
})
wss.on('connection', ws => {
    console.log(Route);
    console.log('Client connected')
    ws.on('close', () => {
        console.log('Close connected')
    })
})