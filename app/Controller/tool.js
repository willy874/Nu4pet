const Controller = require('./core')
const fs = require('fs');

module.exports = class ToolController extends Controller {
    constructor(app){
        super(app)
    }
    getSvgAll(req, res){
        const { input } = req.query
        fs.readdir(input, (err, files) => {
            const filesUrl = []
            files.forEach(file => {
                if (/\.svg$/.test(file)) {
                    filesUrl.push({
                        url: `${input}/${file}`,
                        filename: file
                    })
                }
            })
            Promise.all(
                filesUrl.map(p =>{
                    return new Promise((resolve, reject) => {
                        fs.readFile(p.url,(err, data)=>{
                            if (err) {
                                return reject(err)
                            }
                            resolve({
                                svg: data.toString(),
                                filename: p.filename
                            })
                        })
                    })
                })
            ).then(svg=>{
                res.send({
                    length: files.length,
                    files: svg
                })
            }).catch(err =>{
                res.status('501').send(err)
            })
        })
    }
    createSvgJavascript(req, res){
        const {
            strJavascript,
            filename,
            output
        } = req.body
        fs.writeFile(`${output}/pattern/${filename}.js`, strJavascript , (err)=> {
            if (err) {
                res.status('501').send(err)
                return console.error(err)
            }
            console.log('Create'.green,`${filename}.svg`.blue,'success.'.green)
            res.send('success')
        })
    }
    updateSvgIndex(req, res){
        const {
            path,
        } = req.body
        fs.readdir(`${path}/pattern`, (err, files) => {
            const getName = (name)=>{
                const n1 = name.split('.')[0]
                const a2 = n1.split('-')
                return a2.map(n =>{
                    const s1 = n.split('')
                    s1[0] = s1[0].toUpperCase()
                    return s1.join('')
                }).join('')
            }
            const strImport = files.map(filename=>{
                return `import ${getName(filename)} from './pattern/${filename}'\n`
            }).join('')
            const strExport= files.map(filename=>{
                return `\n  ${getName(filename)}`
            }).join(',')
            const strJavascript = `${strImport}\n\nexport {${strExport}\n}`
            fs.writeFile(`${path}/index.js`, strJavascript , (err)=> {
                if (err) {
                    res.status('501').send(err)
                    return console.error(err)
                }
                console.log('Update index success.'.green)
                res.send('success')
            })
        })
    }
}