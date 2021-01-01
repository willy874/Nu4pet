const Model = require('../../model')

module.exports = function getRecommend(count){
    // @param: count
    const ProdModel = new Model.Prod
    const ProdData = ProdModel.get()
    const arr = new Array(count).fill({})
    const response = arr.map(()=>{
        const randomIndex = Math.floor(Math.random() * Math.floor(ProdData.length))
        return ProdData[randomIndex]
    })
    response.forEach(p=>{
        const ProdImageModel = new Model.ProdImage
        p.image = ProdImageModel.where('prod_id',p.id).get()
    })
    return response
}