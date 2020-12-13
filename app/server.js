const express = require('express')
const cors = require('cors')
require('colors')
const SocketServer = require('ws').Server
const createRoute = require('./router')
const app = express()
const port = 3000

app.use(express.static('dist'))
app.use(cors())
const Route = createRoute(app)
console.log('Route'.blue)
Route.apiData.forEach(r=>{
    console.log('method:',r.method.green,',','url:',`http://localhost:${port}/api${r.url}`.blue);
})
console.log('Web'.blue)
const wss = new SocketServer({
    server: app.listen(port, () => {
        console.log('Server app listening at',`http://localhost:${port}/home.html`.blue)
    })
})
wss.on('connection', ws => {
    console.log(Route);
    console.log('Client connected')
    ws.on('close', () => {
        console.log('Close connected')
    })
})