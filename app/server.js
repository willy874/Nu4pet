const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
require('colors')
const SocketServer = require('ws').Server
const createRoute = require('./router')
const app = express()
const port = 4000

app.use(express.static('dist'))
app.use(cors())
app.use(bodyParser.json())

const Route = createRoute(app)
console.log('Route'.yellow)
Route.apiData.forEach(r=>{
    console.log('method:',r.method.green,',','url:',`http://localhost:${port}/api${r.url}`.blue)
    if (r.url==='/pet/user/:account?') console.log('test:',r.url.green,',',`http://localhost:3000/api/pet/user/admin`.blue);
    if (r.url==='/login') console.log('test:',r.url.green,',',`http://localhost:${port}/api/login?account=admin&password=password`.blue);
    if (r.url==='/pet/status/:type?') console.log('test:',r.url.green,',',`http://localhost:${port}/api/pet/status/dog`.blue);
})

const wss = new SocketServer({
    server: app.listen(port, () => {
        console.log('Web'.yellow)
        console.log('Server app listening.')
        console.log('Home',`http://localhost:${port}/home.html`.blue)
        console.log('Pet',`http://localhost:${port}/pet.html`.blue)
        console.log('Shop',`http://localhost:${port}/shop.html`.blue)
        console.log('Shop Detail',`http://localhost:${port}/shop-detail.html`.blue)
        console.log('Member',`http://localhost:${port}/member.html`.blue)
        console.log('Shop Car',`http://localhost:${port}/shop-car.html`.blue)
        console.log('WebSocket'.yellow)
        console.log(':',`ws://localhost:${port}`.blue)
    })
})

wss.on('connection', ws => {
    // console.log('Client connected')
    
    app.get('/ws/:str?',(req, res)=>{
        const {
            str
        } = req.params
        wss.clients.forEach(client => {
            client.send(str)
        })
        res.send(str)
    })
    
    ws.on('close', () => {
        // console.log('Close connected')
    })
})