import DataModel from './data-model'
import ShopCarModel from './shop_car'
import GiveawayModel from './giveaway'

/**
 * @param {Number} id 
 * @param {Number} user_id 
 * @param {String} order_code 訂單編號
 * @param {String} status 訂單狀態 step1 => step2 => step3 => step4 => step5 => ready
 * @param {String} name 訂單收件人姓名
 * @param {String} sex 訂單收件人性別
 * @param {String} phone 訂單收件人電話
 * @param {String} email 訂單收件人電子郵件
 * @param {String[3]} address_code 訂單收件郵遞區號
 * @param {String} address_city 訂單收件城市
 * @param {String} address_area 訂單收件區域
 * @param {String} address 訂單收件地址
 * @param {String} pay 訂單付款方式
 * @param {String} invoice_type 發票類型
 * @param {String} invoice_code 發票載具編號
 * @param {String} invoice_code_check 發票載具編號確認
 * @param {String} corporation_name 公司名稱
 * @param {String} corporation_code 公司統一編號
 * @param {String} invoice_donate 發票是否捐贈 Y/N
 * @param {String} invoice_donate_code 發票捐贈碼
 * @param {Number} donate_price 捐款金額
 * @param {Number} prod_price 商品總金額
 * @param {Number} point_discount 點數折抵
 * @param {String} sale_code 優惠代碼
 * @param {String} card_code 信用卡卡號
 * @param {String} card_date 信用卡到期日
 * @param {String[3]} card_security 信用卡安全碼
 * @param {Boolean} is_bind_card 是否使用綁定信用卡資料
 * @param {Boolean} save_bind_card 是否綁定信用卡資料
 * @param {String[3]} bank_code 虛擬帳戶銀行代號
 * @param {String} virtual_account 虛擬帳戶號碼
 * @param {String} payment_deadline 虛擬帳戶繳費期限
 * @param {Array<ShopCarModel>} ShopCarList 購物袋商品
 * @param {Array<GiveawayModel>} giveaway 贈品
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
        this.status = entity.status || 'step1' 
        this.name = entity.name || ''
        this.sex = entity.sex || ''
        this.phone = entity.phone || ''
        this.email = entity.email || ''
        this.address_code = entity.address_code || ''
        this.address_city = entity.address_city || ''
        this.address_area = entity.address_area || ''
        this.address = entity.address || ''
        this.pay = entity.pay || ''
        this.invoice_type = entity.invoice_type || ''
        this.invoice_code = entity.invoice_code || ''
        this.invoice_code_check = entity.invoice_code_check || ''
        this.corporation_name = entity.corporation_name || ''
        this.invoice_donate_code = entity.invoice_donate_code || ''
        this.invoice_donate = entity.invoice_donate || 'N'
        this.donate_price = entity.donate_price || 0
        this.prod_price = entity.prod_price || 0
        this.point_discount = entity.point_discount || 0
        this.sale_code = entity.sale_code || ''
        this.card_code = entity.card_code || ''
        this.card_date = entity.card_date || ''
        this.card_security = entity.card_security || ''
        this.is_bind_card = entity.is_bind_card || false
        this.save_bind_card = entity.save_bind_card || false
        this.bank_code = entity.bank_code || ''
        this.virtual_account = entity.virtual_account || ''
        this.payment_deadline = entity.payment_deadline || ''
        this.ShopCarList = entity.ShopCarList && entity.ShopCarList.map(p => new ShopCarModel(p)) || []
        this.giveaway = entity.giveaway && entity.giveaway.map(p => new GiveawayModel(p)) || []
        this.shop_discount = entity.shop_discount || 0
        this.code_discount = entity.code_discount || 0
        this.shipping_rate = entity.shipping_rate || 0
        this.max_point_discount = entity.max_point_discount || 0
        this.order_point = entity.order_point || 0
        this.total_price = entity.total_price || 0
    }
    toDatabase(obj){
        this.set({
            ...obj
        })
        return this
    }
    rules() {
        return {
            /** value,attributes,attributeName,options,constraints
             * @param {*} value 驗證值
             * @param {*} model 被驗證物件
             * @param {String} validName 驗證函式名稱
             * @param {*} options 取設定值
             * @param {*} rules 取規則
             */
            pay: () => {
                if (this.status === 'step1') {
                    return {
                        presence: {
                            allowEmpty: false,
                            message: "^請選擇付款方式"
                        }
                    }
                }else{
                    return null
                }
            },
            name: () => {
                if (this.status === 'step2') {
                    return {
                        presence: {
                            allowEmpty: false,
                            message: "^請填寫收件人名字"
                        }
                    }
                }else{
                    return null
                }
            },
            invoice_code: () => {
                if (this.status === 'step2') {
                    if (this.invoice_type==='vehicle') {
                        return {
                            presence: {
                                allowEmpty: false,
                                message: "^請填寫手機條碼載具"
                            }
                        }
                    }
                    if (this.invoice_type==='natural') {
                        return {
                            presence: {
                                allowEmpty: false,
                                message: "^請填寫自然人憑證條碼"
                            }
                        }
                    }
                    return null
                }else{
                    return null
                }
            },
            invoice_code_check: () => {
                if (this.status === 'step2') {
                    if (this.invoice_type==='vehicle') {
                        return {
                            presence: {
                                allowEmpty: false,
                                message: "^請填寫手機條碼載具確認碼"
                            }
                        }
                    }
                    if (this.invoice_type==='natural') {
                        return {
                            presence: {
                                allowEmpty: false,
                                message: "^請填寫自然人憑證條碼確認碼"
                            }
                        }
                    }
                    return null
                }else{
                    return null
                }
            }
            // sex: {
            //     presence: {
            //         allowEmpty: false,
            //         message: '^請填寫收件人性別'
            //     }
            // },
            // phone: {
            //     presence: {
            //         allowEmpty: false,
            //         message: '^請填寫收件人電話'
            //     }
            // },
            // address_code: {
            //     presence: {
            //         allowEmpty: false,
            //         message: '^請填寫收件地址郵遞區號'
            //     }
            // },
            // address_city: {
            //     presence: {
            //         allowEmpty: false,
            //         message: '^請填寫收件地址城市'
            //     }
            // },
            // address_area: {
            //     presence: {
            //         allowEmpty: false,
            //         message: '^請填寫收件地址地區'
            //     }
            // },
            // address: {
            //     presence: {
            //         allowEmpty: false,
            //         message: '^請填寫詳細收件地址'
            //     }
            // },
        }
    }
}