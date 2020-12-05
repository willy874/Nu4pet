const express = require('express')
const app = express()
const SocketServer = require('ws').Server
const createRoute = require('./api')
const port = 3000
var path = require('path');

app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'pug');

app.use(express.static('dist'))
const Route = createRoute(app)

const wss = new SocketServer({
    server: app.listen(port, () => {
        console.log(`Server app listening at http://localhost:${port}`)
    })
})
wss.on('connection', ws => {
    console.log(Route);
    console.log('Client connected')
    ws.on('close', () => {
        console.log('Close connected')
    })
})