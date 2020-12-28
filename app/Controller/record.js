const Controller = require('./core')
const Model = require('../model')

module.exports = class RecordController extends Controller {
    constructor(app){
        super(app)
    }
    getRecordListData(req, res){
        const RecordModel = new Model.Record
        const response = RecordModel.get()
        res.send( response )
    }
    getRecordAllData(){}
    getRecordDataById(){}
    addRecordData(){}
    updateRecordData(){}
    deleteRecordData(){}
}