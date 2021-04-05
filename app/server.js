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

const wss = new SocketServer({
    server: app.listen(port, () => {
        console.log('Web'.yellow)
        console.log('Server app listening.')
        console.log('Home',`http://localhost:${port}/home.html`.blue)
        console.log('Pet',`http://localhost:${port}/pet.html`.blue)
        console.log('Shop Home',`http://localhost:${port}/shop-home.html`.blue)
        console.log('Shop List',`http://localhost:${port}/shop-list.html`.blue)
        console.log('Shop Detail',`http://localhost:${port}/shop-detail.html`.blue)
        console.log('Member',`http://localhost:${port}/member.html`.blue)
        console.log('Shop Car',`http://localhost:${port}/shop-car.html`.blue)
        console.log('Shopcart Step1',`http://localhost:${port}/shopcart-step1.html`.blue)
        console.log('Shopcart Step2',`http://localhost:${port}/shopcart-step2.html`.blue)
        console.log('Shopcart Step3',`http://localhost:${port}/shopcart-step3.html`.blue)
        console.log('Shopcart Step4',`http://localhost:${port}/shopcart-step4.html`.blue)
        console.log('Shopcart Step5',`http://localhost:${port}/shopcart-step5.html`.blue)
        console.log('WebSocket'.yellow)
        console.log(':',`ws://localhost:${port}`.blue)
        console.log('Tool'.yellow)
        console.log('SVG',`http://localhost:${port}/svg-tool.html`.blue)
    })
})


const Route = createRoute({
    app,
    webSocket: wss
})

wss.on('connection', ws => {
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
    })
})


console.log('Route'.yellow)
Route.apiData.forEach(r=>{
    if (r.url==='/prod'&&r.method==='get') console.log('ProdController'.green)
    if (r.url==='/pet'&&r.method==='get') console.log('PetController'.green)
    if (r.url==='/login'&&r.method==='get') console.log('UserController'.green)
    if (r.url==='/shopcar'&&r.method==='get') console.log('ShopCarController'.green)
    if (r.url==='//record/all'&&r.method==='get') console.log('RecordController'.green)
    if (r.url==='/city'&&r.method==='get') console.log('OtherController'.green)

    console.log('method:',r.method.brightGreen,',','url:',`http://localhost:${port}/api${r.url}`.blue)
    if (r.url==='/login') console.log('test:',r.url.green,',',`http://localhost:${port}/api/login?account=admin&password=password`.blue);
})