module.exports = function getRecommend(){
    // @param: count
    // const ProdModel = new Model.Prod
    // const ProdData = ProdModel.get()
    // const arr = new Array(count).fill()
    // arr.map(()=>{
    //     const randomIndex = Math.floor(Math.random() * Math.floor(ProdData.length))
    //     return ProdData[randomIndex]
    // })
    return  [
        {id: 1,image_url: './assets/image/prod-01.min.jpg'},
        {id: 2,image_url: './assets/image/prod-02.min.jpg'},
        {id: 3,image_url: './assets/image/prod-03.min.jpg'}
    ]
}