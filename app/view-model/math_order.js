const Model = require('../model')

/**
 * @class（@constructor）
 */
const ProdModel = Model.Prod

/**
 * @param {Array<ProdModel>} prod 購物車中的商品集合
 * @param {Array<ProdModel>} giveaway 贈品
 * @param {Number} prod[].count 購買數量
 * @param {Number} prod_total_price 商品總計
 * @param {Number} shop_discount 商城折扣
 * @param {Number} code_discount 優惠代碼折扣
 * @param {Number} point_discount 點數折抵
 * @param {Number} shipping_rate 運費
 * @param {Number} max_point_discount 最大折抵
 * @param {Number} order_point 結帳取得貨物點數
 */
module.exports = class MathOrder{
    constructor(args){
        const entity = args ? args : {}
        this.prod = entity.prod && entity.prod.map(p=>new ProdModel(p)) || []
        this.giveaway = entity.giveaway && this.giveaway.map(p=>new ProdModel(p)) || []
        this.prod_total_price = entity.prod_total_price || 0
        this.shop_discount = entity.shop_discount || 0
        this.code_discount = entity.code_discount || 0
        this.point_discount = entity.point_discount || 0
        this.shipping_rate = entity.shipping_rate || 0
        this.max_point_discount = entity.max_point_discount || 0
        this.order_point = entity.order_point || 0
    }
    toBrowser(){
        return {
            giveaway: this.giveaway,
            prod_total_price: this.prod_total_price,
            shop_discount: this.shop_discount,
            code_discount: this.code_discount,
            point_discount: this.point_discount,
            shipping_rate: this.shipping_rate,
            max_point_discount: this.max_point_discount,
            order_point: this.order_point,
        }
    }
}