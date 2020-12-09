const fs = require('fs')

/**
 * @param {String} table
 * @param {Array<String>} fillable
 * @param {String} primaryKey
 * @param {Function} insertRules
 */
module.exports = class Model {
    constructor(ops){
        this.table = ops.table
        this.fillable = ops.fillable
        this.primaryKey = ops.primaryKey || 'id'
        this.insertRules = ops.insertRules || function(){console.log(`Insert is not rules.`)}
        Object.defineProperty(this,'DB',{
            enumerable: false,
            value: JSON.parse(
                fs.readFileSync(`./app/db/${this.table}.json`).toString()
            )
        })
    }
    where(key,param1,param2){
        const param = {}
        if ((['=','==','===','>','<','>=','<=','like'].includes(param1))) {
            param.rule = param1
            param.data = param2
        }else{
            param.rule = '='
            param.data = param1
        }
        this.whereRules = (DB)=>{
            return DB.filter(t=>{
                if (param.rule === '=' || param.rule === '==') {
                    return t[key] == param.data
                }else if (param.rule === '==='){
                    return t[key] === param.data
                }else if (param.rule === '<'){
                    return t[key] < param.data
                }else if (param.rule === '>'){
                    return t[key] > param.data
                }else if (param.rule === '<='){
                    return t[key] <= param.data
                }else if (param.rule === '>='){
                    return t[key] >= param.data
                }else if (param.rule === 'like'){
                    return new RegExp(param.data).test(t[key])
                }else{
                    return t[key] == param.data
                }
            })
        }
        return this
    }
    all(callback){
        if (callback) {
            fs.readFile(`./app/db/${this.table}.json`, (err, data)=>{
                if (err) {
                    console.error(err)
                    callback(err)
                    return this
                }
                const DB = JSON.parse(data.toString())
                callback(undefined,DB)
            })
            return this
        }
        return this.DB
    }
    get(){
        if (this.whereRules) {
            return this.whereRules(this.DB)
        }
        return this.DB
    }
    pagination(ops){
        const {
            page,
            per
        } = ops
        const data = this.get()
        const currentPage = Number(page) || 1
        const perPage = Number(per) || 10
        const total = data.length
        const last = Math.ceil(total/perPage)
        const response = {
            data: [],
            currentPage,
            total,
            perPage,
            last,
        }
        if (currentPage <= last) {
            response.data = data.filter((p,i)=>(currentPage-1)*perPage <= i && i < currentPage*perPage)
        }
        return response
    }
    add(data){
        const {
            primaryKey,
            table,
            fillable,
            DB
        } = this
        const newData = {}
        if (data[primaryKey]) {
            if (DB.some(p=>p[primaryKey]==data[primaryKey])) {
                return console.error(`The ${table} primary key already exists.`)
            }
        }else{
            const dataCount = DB.length
            const lastCount = Number(DB[dataCount-1][primaryKey])
            if (DB.some(p=>p[primaryKey]==dataCount)) {
                data[primaryKey] = dataCount
            }else if(lastCount===lastCount){
                data[primaryKey] = lastCount +1
            }else{
                this.insertRules(data)
            }
        }
        fillable.forEach(key=>{
            if (data[key] !== undefined) {
                newData[key] = data[key]
            }
        })
        DB.push(newData)
        fs.writeFile(`./app/db/${table}.json`, JSON.stringify(newData) , (err)=> {
            if (err) {
                return console.error(err)
            }
            console.log(`Add ${table} data in DB.`.green)
        })
    }
    update(){

    }
}