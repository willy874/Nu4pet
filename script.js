const Webpack = require('webpack')
// const Colors = require('colors')
const WebpackConfig = require('./webpack.config')
const { exec } = require('child_process')
const Readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

class Script{
    constructor(args){
        const ops = args || {}
        this.mode = ops.mode || 'static'
    }
    setting(args){
        Object.keys(args).forEach(key =>{
            this[key] = args[key]
        })
    }
    webpack(){
        this.mode = 'webpack'
        console.log('Script Mode:',this.mode.yellow);

        if (/m:dev/.test(this.line)) {
            Webpack(WebpackConfig, (err, stats) => {
                if (err || stats.hasErrors()) {
                    console.log('ERROR'.red,':',stats.compilation.errors.join(''));
                    console.log('webpack'.yellow,'action mode is','development'.blue,',','compile error'.red,'.');
                    script.close();
                }else{
                    console.log('webpack'.yellow,'action mode is','development'.blue,',','compile success'.green,'.');
                }
            })
        }else if (/m:prod/.test(this.line)) {
            WebpackConfig.mode = 'production'
            Webpack(WebpackConfig, (err, stats) => {
                if (err || stats.hasErrors()) {
                    console.log('ERROR'.red,':',stats.compilation.errors.join(''));
                    console.log('webpack'.yellow,'action mode is','production'.blue,',','compile error'.red,'.');
                }else{
                    console.log('webpack'.yellow,'action mode is','production'.blue,',','compile success'.green,'.');
                }
            });
        }else{
            console.log(`Webpack Mode,${this.line} is not script`)
        }
    }
    git(){
        this.mode = 'git'
        console.log('Script Mode:',this.mode.yellow);

        if (/save/.test(this.lineArray[1])) {
            exec(`git add .`)
            console.log('git'.yellow,`git add .`);
            const commit = (function(){
                const strValue = this.lineArray.find(str=>/^m:/.test(str))
                const index = this.lineArray.indexOf(strValue)
                if (index >= 0) {
                    return this.lineArray.slice().splice(index).join(' ').replace(/m:/,'')
                }
            })()
            if(commit){
                exec(`git commit -m ${commit}`)
                console.log('git'.yellow,`commit -m "${commit}"`);
            }
            const branch = (function(){
                const strValue = this.lineArray.find(str=>/^b:/.test(str))
                if (strValue) {
                    const bs = strValue.split('b:')[1]
                    if (bs === '.') {
                        return 'master'
                    }else{
                        return bs
                    } 
                }
            })()
            if(branch){
                exec(`push -u origin ${branch}`)
                console.log('git'.yellow,`push ${branch}`);
            }

            console.log('git'.yellow,'save success'.green,'.')
        }else(
            console.log(`Git Mode,${this.line} is not script`)
        )
    }
    task(){
        switch (this.lineArray[0]) {
            case 'webpack': this.webpack()
                break;
            case 'git': this.git()
                break;
            default: console.log(`${this.line} is not script`);
                break;
        }
    }
    close(){
        console.log('Mode reset','Exit Readline'.red,'.')
        Readline.close()
    }
}

const script = new Script()

Readline.on('line', function (line) {
    const lineArray = (function(){
        const str = line.trim()
        return str.split(' ')
    })()

    script.setting({
        line,
        lineArray
    })
    console.log(script);

    if (/^close/.test(line)) {
        script.close()
    }
    switch (this.mode) {
        case 'webpack': script.webpack()
            break;
        case 'git': script.git()
            break;
        default: script.task()
            break;
    }
});

