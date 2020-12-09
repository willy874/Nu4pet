import Validate from 'validate.js'
import '../validate'

// RequestPayloadModel
export default class ListModel {
    constructor(args) {
        const entity = args ? args : {}
        this.data = entity.data || []
        this.listErrors = []
        this.paging = {
            //laraval 相關參數
            path: entity.path || '', // 搜尋字串
            first: entity.first_page_url || '', //
            prev: entity.last_page_url || '',  //
            next: entity.next_page_url || '',  //
            last: entity.last_page_url || '',  //
            count: entity.count || 0, // 當前頁資料總筆數
            currentPage: entity.current_page || 1, // 當前頁的頁碼
            perPage: entity.per_page || 10, // 每頁最大筆數
            lastPage: entity.last_page || 1, // 最後頁數頁數
            total: entity.total || 0, // 總資料筆數
            from: entity.from || 0, // 來源頁碼
            to: entity.to || 0,  // 目標頁碼
            links: entity.links && entity.links.map(link => new Object(link)) || [],
            maxPage: entity.max_page || 9, // 最大顯示頁數
        }
        // 內部使用參數
        this.loaded = entity.loaded || !args // 非同步資料是否取得
    }
    listValidate() {
        return this.data.map(model => {
            return model.validate()
        })
    }
    getImageArray(){
        const imageArray = []
        this.data.forEach(model => {
            if(model.images){
                model.images.forEach(image =>{
                    image.article_id = this.id
                    imageArray.push(image)
                })
            }
        })
        return imageArray
    }
}
