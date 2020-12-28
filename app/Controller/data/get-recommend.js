const Model = require('../../model')

module.exports = function getRecommend(count){
    // @param: count
    const ProdModel = new Model.Prod
    const ProdData = ProdModel.get()
    const arr = new Array(count).fill({})
    return arr.map(()=>{
        const randomIndex = Math.floor(Math.random() * Math.floor(ProdData.length))
        return ProdData[randomIndex]
    })
}