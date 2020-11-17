const Webpack = require('webpack')
const Colors = require('colors')
const WebpackConfig = require('./webpack.config')
const { exec } = require('child_process')
const Readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
Readline.mode = 'static'

function webpackScript(line){
    Readline.mode = 'webpack'
    console.log('Script Mode:',Readline.mode.yellow);

    if (/mode=dev/.test(line)) {
        Webpack(WebpackConfig, (err, stats) => {
            if (err || stats.hasErrors()) {
                console.log(stats.compilation.errors);
                console.log('webpack'.yellow,'action mode is','development'.blue,',','compile error'.red,'.');
            }else{
                console.log('webpack'.yellow,'action mode is','development'.blue,',','compile success'.green,'.');
            }
        });
        Readline.close();
    }else if (/mode=prod/.test(line)) {
        WebpackConfig.mode = 'production'
        Webpack(WebpackConfig, (err, stats) => {
            if (err || stats.hasErrors()) {
                console.log(stats.compilation.errors);
                console.log('webpack'.yellow,'action mode is','production'.blue,',','compile error'.red,'.');
            }else{
                console.log('webpack'.yellow,'action mode is','production'.blue,',','compile success'.green,'.');
            }
        });
        Readline.close();
    }else{
        console.log(`Webpack Mode,${line} is not script`)
    }
}

function gitScript(line,lineArray){
    Readline.mode = 'git'
    console.log('Script Mode:',Readline.mode.yellow);

    if (/save/.test(lineArray[1])) {
        exec(`git add .`)
        console.log('git'.yellow,`git add .`);
        const commit = (function(){
            const strValue = lineArray.find(str=>/^m\:/.test(str))
            const index = lineArray.indexOf(strValue)
            if (index >= 0) {
                return lineArray.slice().splice(index).join(' ').replace(/m\:/,'')
            }
        })()
        if(commit){
            exec(`git commit -m ${commit}`)
            console.log('git'.yellow,`commit -m "${commit}"`);
        }
        const branch = (function(){
            const strValue = lineArray.find(str=>/^b\:/.test(str))
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
            exec(`git push ${branch}`)
            console.log('git'.yellow,`push ${branch}`);
        }

        console.log('git'.yellow,'save success'.green,'.')
        Readline.close()
    }else(
        console.log(`Git Mode,${line} is not script`)
    )
}

function closeScript(line){
    Readline.mode = 'static'
    console.log('Exit Readline')
    Readline.close()
}


function commitScript(line){
    const lineArray = (function(){
        const str = line.trim()
        return str.split(' ')
    })()

    switch (lineArray[0]) {
        case 'webpack': 
            webpackScript(line,lineArray)
            break;
        case 'git': 
            gitScript(line,lineArray)
            break;
        case 'close': closeScript(line)
            break;
        default: console.log(`${line} is not script`);
            break;
    }
}

Readline.on('line', function (line) {
    switch (Readline.mode) {
        case 'webpack': webpackScript(line)
            break;
        case 'git': gitScript(line)
            break;
        default: commitScript(line)
            break;
    }
});

