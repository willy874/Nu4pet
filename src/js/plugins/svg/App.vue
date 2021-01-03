<template>
    <div class="container">
        <h1 class="h2 py-2">SVG 轉換 JS Schema 工具</h1>
        <hr>
        <div class="row">
            <div class="col-lg-6 py-2 row align-items-center">
                <h5 class="col-auto">輸入 URL</h5>
                <div class="col">
                    <input class="form-control" type="text" v-model="config.inputUrl">
                </div>
            </div>
            <div class="col-lg-6 py-2 row align-items-center">
                <h5 class="col-auto">輸出 URL</h5>
                <div class="col">
                    <input class="form-control" type="text" v-model="config.outputUrl">
                </div>
            </div>
        </div>
        <hr>
        <div class="py-2">
            <h3 class="h5 py-2">將輸入口 index.js 索引更新為目前 pattern 資料夾中所有 Schema</h3>
            <button class="btn btn-primary text-white" @click="updateSvgIndex">更新索引</button>
        </div>
        <hr>
        <div class="py-2">
            <h3 class="h5 py-2">將輸入口資料夾內全部 SVG 轉換為 JS Schema 檔案</h3>
            <button class="btn btn-primary text-white" @click="getSvgAll">
                <div v-if="boolLoader && filesLength === filesLoaded" v-show="loaded()"></div>
                <div v-if="filesLength === filesLoaded">SVG 一鍵轉換 JS</div>
                <div v-if="filesLength !== filesLoaded" class="d-flex align-items-center">
                    <div class="spinner-border text-light" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="mb-0 mx-3">{{filesLoaded}} / {{filesLength}}</div>
                </div>
            </button>
        </div>
        <div>
            <div class="row" v-for="item in filesSvg" :key="item.filename">
                <div class="col-2 py-2" v-html="item.svg"></div>
            </div>
        </div>
        <hr>
        <div class="py-2">
            <div class="row">
                <div class="col-12">
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="file" ref="fileInput" @change="changeFile">
                        <label class="custom-file-label" for="file">{{ filename }}</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="py-2">
            <button class="btn btn-primary text-white" @click="getSvg">
                <div>指定 SVG 轉換 JS</div>
            </button>
        </div>
        <div class="row py-2">
            <div class="col-2">
                <img v-if="fileBase64" :src="fileBase64" alt="">
            </div>
        </div>
    </div>
</template>
<script>
import config from '@/config'
import axios from 'axios'
import Swal from 'sweetalert2'
import rules from './svg-format-rules'

export default {
    data(){
        return {
            config: {
                inputUrl: 'src/assets/svg',
                outputUrl: 'src/js/components/icon',
            },
            boolLoader: false,
            filesLength: 0,
            filesLoaded: 0,
            filesSvg: [],
            fileBase64: '',
            filename: '選擇指定檔案'
        }
    },
    methods: {
        loaded(){
            Swal.fire({
                icon: 'success',
                timer: 1500,
                title: '轉換成功',
                showConfirmButton: false,
            })
            this.boolLoader = false
            return 0
        },
        changeFile(){
            const files = this.$refs.fileInput.files
            this.filename = files[0].name
        },
        getSvgAll(){
            this.filesLength = 0
            this.filesLoaded = 0
            axios.get(`${config.api.baseUrl}svg/all?input=${this.config.inputUrl}`).then(res=>{
                this.filesLength = res.data.length
                this.boolLoader = true
                this.filesSvg = res.data.files
                this.filesSvg.forEach(item=>{
                    this.conversion(item,()=>{
                        this.filesLoaded++
                    },()=>{
                        this.filesLoaded++
                    })
                })
            }).catch(()=>{
                Swal.fire({
                    icon: 'error',
                    title: '轉換失敗'
                })
            })
        },
        getSvg(){
            const files = this.$refs.fileInput.files
             if (files && files.length) {
                files[0].text().then(res=>{
                    this.conversion({
                        filename: this.filename,
                        svg: res
                    },()=>{
                        this.filename = '選擇指定檔案'
                        const reader = new FileReader()
                        reader.onload = (e) => {
                            this.fileBase64 = e.target.result
                            Swal.fire({
                                icon: 'success',
                                timer: 1500,
                                title: '更新成功',
                                showConfirmButton: false,
                            })
                        }
                        reader.readAsDataURL(files[0])
                    })
                })
            }
        },
        conversion(item,resolve,reject) {
            const el = document.createElement('div')
            el.innerHTML = item.svg
            const filename = item.filename.split('.')[0]
            const viewBox = el.querySelector('svg').getAttribute('viewBox')
            let strPath = ''
            el.querySelectorAll(rules.map(p=>p.name).join(',')).forEach(path=>{
                const rule = rules.find(p=>p.name===path.tagName)
                const strPattern = `    <${rule.name}`
                    + (`${rule.attrPath.map(attr=>{
                        const value = path.getAttribute(attr)
                        return value ? ` ${attr}="${value}"` : ''
                    }).join('')}`) 
                    + (rule.html ? `>${path.innerHTML}</${rule.name}>` : '/>')
                    + '\n'
                strPath += strPattern
            })
            const strJavascript = `export default {\n`
                                + `  mount: '.icon-${filename}',\n`
                                + `  attrs: {\n  viewBox: '${viewBox}' ,\n  fill: 'currentColor'\n  },\n`
                                + `  path: \`\n${strPath}  \`  \n}`
            axios.post(`${config.api.baseUrl}svg/create`,{
                output: this.config.outputUrl,
                strJavascript,
                filename,
            }).then(res=>{
                if(resolve) resolve(res)
            }).catch(err=>{
                if(reject) reject(err)
            })
        },
        updateSvgIndex(){
            axios.put(`${config.api.baseUrl}svg/index`,{
                path: this.config.outputUrl
            }).then(()=>{
                Swal.fire({
                    icon: 'success',
                    timer: 1500,
                    title: '更新成功',
                    showConfirmButton: false,
                })
            })
        }
    }
}
</script>
<style scoped>
    .spinner-border {
        width: 1rem;
        height: 1rem;
    }
</style>