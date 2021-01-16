const Controller = require('../controller')


module.exports =  class Route{
    constructor(args){
        const entity = args ? args : {}
        this.entity = entity
        this.app = entity.app
        this.webSocket = entity.webSocket
        this.connSocket = entity.connSocket
        this.apiData = []
    }
    handleCallback (data){
        const handle = (callback)=>{
            if(typeof callback === 'function'){
                return callback
            }else if(typeof callback === 'string' && /@/.test(callback)){
                const str = callback.split('@')
                if (!Controller[str[0]]) {
                    throw new Error(`沒有名為 ${str[0]} 的 Controller`)
                }
                const contro = new Controller[str[0]](this.entity)
                if (!contro[str[1]]) {
                    throw new Error(`沒有名為 ${str[1]} 的 Function`)
                }
                return contro[str[1]]
            }else{
                throw new Error('必須是個 Controller')
            }
        }
        if (Array.isArray(data)) {
            return data.map(item=>handle(item))
        }else{
            return handle(data)
        }
    }
    get(url,callback){
        this.app.get(url,this.handleCallback(callback))
    }
    api(method,url,callback){
        this.apiData.push({method,url})
        this.app[method]('/api'+url,this.handleCallback(callback))
    }
    post(url,callback){
        this.app.post(url,this.handleCallback(callback))
    }
    put(url,callback){
        this.app.put(url,this.handleCallback(callback))
    }
    delete(url,callback){
        this.app.delete(url,this.handleCallback(callback))
    }
}