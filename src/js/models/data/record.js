import DataModel from './data-model'
import ShopCarModel from './shop_car'

/**
 * @param {Number} id 
 * @param {Number} user_id 
 * @param {String} order_code 訂單編號
 * @param {String} status 訂單狀態
 * @param {String} name 訂單收件人姓名
 * @param {String} sex 訂單收件人性別
 * @param {String} phone 訂單收件人電話
 * @param {String} email 訂單收件人電子郵件
 * @param {String[3]} address_code 訂單收件郵遞區號
 * @param {String} address_city 訂單收件城市
 * @param {String} address_area 訂單收件區域
 * @param {String} address 訂單收件地址
 * @param {String} pay 訂單付款方式
 * @param {String} card_code 信用卡卡號
 * @param {String} card_date 信用卡到期日
 * @param {String[3]} card_security 信用卡安全碼
 * @param {String} staging_card_code 分期信用卡卡號
 * @param {String} staging_card_date 分期信用卡到期日
 * @param {String[3]} staging_card_security 分期信用卡安全碼
 * @param {String} invoice_type 發票類型
 * @param {String} invoice_donate 發票是否捐贈 Y/N
 * @param {Number} donate_price 捐款金額
 * @param {Number} prod_price 商品總金額
 * @param {Number} point_discount 點數折抵
 * @param {String} sale_code 優惠代碼
 * @param {Array<ShopCarModel>} ShopCarList 購物袋商品
 * @param {Array<ProdModel>} giveaway 贈品
 * @param {Number} shop_discount 商城折扣
 * @param {Number} code_discount 優惠代碼折扣
 * @param {Number} shipping_rate 運費
 * @param {Number} max_point_discount 最大折抵
 * @param {Number} order_point 結帳取得貨物點數
 * @param {Number} total_price 最終結算金額
 */
export default class RecordModel extends DataModel {
    constructor(args) {
        super(args)
        const entity = this.entity || {}
        this.id = entity.id || 0
        this.user_id = entity.user_id || 0
        this.order_code = entity.order_code || ''
        this.status = entity.status || 'ready' // ready
        this.name = entity.name || ''
        this.sex = entity.sex || ''
        this.phone = entity.phone || ''
        this.email = entity.email || ''
        this.address_code = entity.address_code || ''
        this.address_city = entity.address_city || ''
        this.address_area = entity.address_area || ''
        this.address = entity.address || ''
        this.pay = entity.pay || ''
        this.card_code = entity.card_code || ''
        this.card_date = entity.card_date || ''
        this.card_security = entity.card_security || ''
        this.staging_card_code = entity.staging_card_code || ''
        this.staging_card_date = entity.staging_card_date || ''
        this.staging_card_security = entity.staging_card_security || ''
        this.invoice_type = entity.invoice_type || ''
        this.invoice_donate = entity.invoice_donate || 'N'
        this.donate_price = entity.donate_price || 0
        this.prod_price = entity.prod_price || 0
        this.point_discount = entity.point_discount || 0
        this.sale_code = entity.sale_code || ''
        this.ShopCarList = entity.ShopCarList && entity.ShopCarList.map(p => new ShopCarModel(p)) || []
        this.giveaway = entity.giveaway && entity.giveaway.map(p => new ShopCarModel(p)) || []
        this.shop_discount = entity.shop_discount || 0
        this.code_discount = entity.code_discount || 0
        this.shipping_rate = entity.shipping_rate || 0
        this.max_point_discount = entity.max_point_discount || 0
        this.order_point = entity.order_point || 0
        this.total_price = entity.total_price || 0
    }
    toDatabase() {
        return {
            id: this.id,
        }
    }
    rules() {
        return {
            name: {
                presence: {
                    allowEmpty: false,
                    message: '^請填寫收件人名字'
                }
            },
            sex: {
                presence: {
                    allowEmpty: false,
                    message: '^請填寫收件人性別'
                }
            },
            phone: {
                presence: {
                    allowEmpty: false,
                    message: '^請填寫收件人電話'
                }
            },
            address_code: {
                presence: {
                    allowEmpty: false,
                    message: '^請填寫收件地址郵遞區號'
                }
            },
            address_city: {
                presence: {
                    allowEmpty: false,
                    message: '^請填寫收件地址城市'
                }
            },
            address_area: {
                presence: {
                    allowEmpty: false,
                    message: '^請填寫收件地址地區'
                }
            },
            address: {
                presence: {
                    allowEmpty: false,
                    message: '^請填寫詳細收件地址'
                }
            },
            // card_code: (value, attributes, attributeName, options, constraints) => {
            //     if(!this.pay === 'card'){
            //         return null
            //     }
            //     return {
            //         presence: {
            //             allowEmpty: false,
            //             message: "^請填寫信用卡"
            //         }
            //     }
            // },
        }
    }
}