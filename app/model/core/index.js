const fs = require('fs')

/**
 * @param {String} table
 * @param {Array<String>} fillable
 * @param {String} primaryKey
 * @param {Function} insertRules
 * @param {Collection<Function>} middleware
 */
module.exports = class Model {
    constructor(ops){
        this.table = ops.table
        this.fillable = ops.fillable
        this.middleware =  ops.middleware && {
            getDB: ops.middleware.getDB || undefined,
            getTable: ops.middleware.getTable || undefined,
            addTable: ops.middleware.addTable || undefined,
        } || {}

        this.primaryKey = ops.primaryKey || 'id'
        this.deleteKey = ops.deleteKey || 'deleted_at'
        this.insertRules = ops.insertRules || function(){console.log(`Insert is not rules.`)}
        const jsonFile = fs.readFileSync(`./app/db/${this.table}.json`)
        const jsonString = jsonFile.toString()
        const value = JSON.parse(jsonString)
        Object.defineProperty(this,'DB',{
            get: function(){
                const getTable = (param) =>{
                    if (this.middleware.getTable) {
                        return param.map(v=>this.middleware.getTable(v))
                    }
                    return param
                }
                const getDB = (param) =>{
                    if (this.middleware.getDB) {
                        return this.middleware.getDB(param)
                    }
                    return param
                }
                return getDB(getTable(value))
            }
        })
        this.whereRules = [(DB)=>DB.filter(p=>!p[this.deleteKey])]
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
        this.whereRules.push(
            (DB)=>{
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
        )
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
        if (this.whereRules.length) {
            return this.whereRules.reduce((val,where)=>{
                return where(val)
            },this.DB)
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
            middleware,
            insertRules,
            DB
        } = this
        const newData = {}
        const lastCount = DB.length ? (Number(DB[DB.length-1][primaryKey]) + 1) : 1
        let resultIndex = -1
        fillable.forEach(key=>{
            if (middleware.addTable) {
                newData[key] = middleware.addTable(data[key],key)
            }else{
                newData[key] = data[key]
            }
        })
        if (data[primaryKey]) {
            if (DB.some(p=>p[primaryKey]===data[primaryKey])) {
                return console.error(`The ${table} primary key already exists.`)
            }else{
                DB.push(data)
            }
        }else{
            if(!isNaN(lastCount)){
                newData[primaryKey] = lastCount
                DB.push(newData)
                resultIndex = lastCount
            }else if(insertRules){
                resultIndex = insertRules.call(this,DB,data)
            }else{
                return console.error(`The primary key does not meet the preset rules.`)
            }
        }
        fs.writeFile(`./app/db/${table}.json`, JSON.stringify(DB) , (err)=> {
            if (err) {
                return console.error(err)
            }
            console.log(`Add ${table} data in DB.`.green)
        })
        return resultIndex
    }
    update(data){
        const {
            table,
            fillable,
            middleware,
            primaryKey,
            DB
        } = this
        DB.forEach(dbTable=>{
            const newData = (String(dbTable[primaryKey]) === String(data[primaryKey])) ? data : dbTable
            fillable.forEach(key=>{
                if (middleware.updateTable) {
                    dbTable[key] = middleware.updateTable(newData[key],key) || middleware.updateTable(dbTable[key],key)
                }else{
                    dbTable[key] = newData[key] || dbTable[key]
                }
            })
        })
        fs.writeFile(`./app/db/${table}.json`, JSON.stringify(DB) , (err)=> {
            if (err) {
                return console.error(err)
            }
            console.log(`Update ${table} data in DB.`.green)
        })
    }
    delete(id){
        const {
            table,
            primaryKey
        } = this
        const DB = JSON.parse(fs.readFileSync(`./app/db/${table}.json`).toString())
        const arrKeyIndex = DB.map(p=>p[primaryKey]).indexOf(id)
        DB.splice(arrKeyIndex,1)
        fs.writeFile(`./app/db/${table}.json`, JSON.stringify(DB) , (err)=> {
            if (err) {
                return console.error(err)
            }
            console.log(`Delete ${table} data in DB.`.red)
        })
    }
}