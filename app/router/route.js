const Controller = require('../controller')

module.exports =  class Route{
    constructor(app){
        this.app = app
        this.handleCallback = (data)=>{
            const handle = (callback)=>{
                if(typeof callback === 'function'){
                    return callback
                }else if(typeof callback === 'string'){
                    const str = callback.split('@')
                    const contro = new Controller[str[0]](app)
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
        this.apiData = []
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