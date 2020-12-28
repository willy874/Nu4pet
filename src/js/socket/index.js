import config from '@/config'

const ws = new WebSocket(config.webSocket)

ws.onopen = () => {
    console.log('open connection')
}
ws.onclose = () => {
    console.log('close connection')
}
ws.onmessage = event => {
    console.log('Web Socket',event.data,event)
}

export default ws
