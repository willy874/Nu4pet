import ArticleModel from './article'

export default class PortfolioModel extends ArticleModel {
    constructor(args) {
        super(args)
        const entity = args ? args : {}
    }
    rules() {
        return {
            subject: {
                presence: {
                    allowEmpty: false,
                    message: '^請填寫標題'
                }
            },
            content: {
                presence: {
                    allowEmpty: false,
                    message: '^請填寫內容'
                }
            },
        }
    }
}