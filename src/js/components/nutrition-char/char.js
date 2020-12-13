import Canvas from './canvas'

const pathData = [
    {
        fill: '#619eed',
        text: {
            x: '430.66',
            y: '247.78',
            font: '37.6px MicrosoftJhengHeiBold',
            str: '粗蛋白質',
        }
    },
    {
        fill: '#ecb850',
        text: {
            x: '447.35',
            y: '562.93',
            font: '37.6px MicrosoftJhengHeiBold',
            str: '粗脂肪',
        }
    },
    {
        fill: '#6bc0b1',
        text: {
            x: '145.18',
            y: '572.93',
            font: '37.6px MicrosoftJhengHeiBold',
            str: '代謝能',
        }
    },
    {
        name: 'protein',
        fill: '#5b5b5b',
        text: {
            align: 'center',
            x: '505.66',
            y: '191.58',
            font: '52.63px Helvetica',
            str: '',
        }
    },
    {
        name: 'fat',
        fill: '#5b5b5b',
        text: {
            align: 'center',
            x: '500.66',
            y: '510.46',
            font: '52.63px Helvetica',
            str: '',
        }
    },
    {
        name: 'metabolism',
        fill: '#5b5b5b',
        text: {
            align: 'center',
            x: '200.67',
            y: '494.25',
            font: '46.33px Helvetica',
            str: '',
        }
    },
    {
        fill: '#5b5b5b',
        text: {
            align: 'center',
            x: '200.67',
            y: '526.25',
            font: '28.77px Helvetica',
            str: 'kcal',
        }
    },
    {
        fill: '#6bc0b1',
        path: new Path2D('M393.44,504.33c0-108.47-88.56-196.42-197-196.42S0,395.84,0,504.32s88.3,196.4,196.78,196.4V615.31c-61.7,0-112.08-49.3-112.08-111a111.6,111.6,0,1,1,223.19,0Z')
    },
    {
        fill: '#ecb850',
        path: new Path2D('M307.87,504.33c0,108.47,88.08,196.44,196.55,196.44s196.4-87.93,196.4-196.4S613.05,307.68,504.58,307.68v85.41a111.49,111.49,0,1,1-.16,223c-61.69,0-111-50.05-111-111.74Z')
    },
    {
        fill: '#619eed',
        path: new Path2D('M504.29,0c-108.47,0-196.4,87.93-196.4,196.4s88.22,196.69,196.69,196.69V307.68c-61.7,0-112-49.58-112-111.28A111.7,111.7,0,0,1,504.29,84.7c61.7,0,111,51,111,112.71h85.56C700.84,88.94,612.77,0,504.29,0Z')
    },
    {
        fill: '#fff',
        text: {
            x: '640.56',
            y: '187.23',
            font: '25.06px Helvetica',
            str: '0%',
        }
    },
    {
        fill: '#fff',
        text: {
            x: '450',
            y: '355',
            font: '25.06px Helvetica',
            str: '32%',
        }
    },
    {
        fill: '#fff',
        text: {
            x: '512',
            y: '366.09',
            font: '25.06px Helvetica',
            str: '0%',
        }
    },
    {
        fill: '#fff',
        text: {
            x: '332',
            y: '536',
            font: '25.06px Helvetica',
            str: '17%',
        }
    },
    {
        fill: '#fff',
        text: {
            x: '342.2',
            y: '490.49',
            font: '25.06px Helvetica',
            str: '0',
        }
    },
    {
        fill: '#fff',
        text: {
            x: '130.57',
            y: '661.81',
            font: '25.06px Helvetica',
            str: '1000',
        }
    },
    {
        fill: '#fff',
        path: new Path2D('M567.06,364.92a6.42,6.42,0,0,1-1,2.35c49.18,24.39,87.48,78.49,87.48,137.05,0,82.23-66.91,149.13-149.14,149.13A150,150,0,0,1,362.85,552.54c-.75.14-1.52.25-2.3.33h-.27A152.55,152.55,0,0,0,504.42,656c83.64,0,151.68-68,151.68-151.68C656.1,444.7,617.16,389.69,567.06,364.92Z')
    },
    {
        fill: '#fff',
        path: new Path2D('M437.58,334.44a6.38,6.38,0,0,1,1.09-2.31c-48-26.64-83.74-82.46-81-140.95C361.46,109,431.4,45.31,513.54,49.12A150,150,0,0,1,650.27,156.5a22,22,0,0,1,2.31-.22h.28a152.56,152.56,0,0,0-139.2-109.7C430.11,42.7,359,107.51,355.1,191.06,352.34,250.61,388.68,307.37,437.58,334.44Z')
    },
    {
        fill: '#fff',
        path: new Path2D('M196.47,346.5c-87,0-157.82,70.8-157.82,157.82A157.77,157.77,0,0,0,119.7,642c.23-.85.43-1.71.61-2.57A155.23,155.23,0,0,1,41.19,504.32C41.19,418.7,110.85,349,196.47,349a156,156,0,0,1,148,107,24.76,24.76,0,0,1,2.46-.68A158.56,158.56,0,0,0,196.47,346.5Z')
    },
    {
        name: 'proteinRotate',
        fill: '#254978',
        transform: {
            rotate: {
                cx: '505.79',
                cy: '197.54',
                deg: ''
            }
        },
        path: new Path2D('M671.61,153.26A20.7,20.7,0,1,0,651,175.85q1,0,1.95-.09a20.68,20.68,0,0,0,18.7-22.5Z')
    },
    {
        name: 'fatRotate',
        fill: '#765c28',
        transform: {
            rotate: {
                cx: '503.64',
                cy: '503.78',
                deg: ''
            }
        },
        path: new Path2D('M588,364.19a20.69,20.69,0,1,0-20.64,22.6c.64,0,1.29,0,1.94-.09A20.69,20.69,0,0,0,588,364.19Z')
    },
    {
        name: 'metabolismRotate',
        fill: '#357468',
        transform: {
            rotate: {
                cx: '194.54',
                cy: '503.44',
                deg: ''
            }
        },
        path: new Path2D('M367.57,455.31a20.69,20.69,0,1,0-20.64,22.59c.64,0,1.29,0,1.94-.09a20.69,20.69,0,0,0,18.7-22.5Z')
    },
]    
export default class Char extends Canvas {
    constructor(ops){
        super(ops)
        this.box = {
            x: '700.84',
            y: '700.77'
        }
        this.pathData = pathData
        this.data = {
            protein: 0,
            fat: 0,
            metabolism: 0,
            proteinRotate: 0,
            fatRotate: 0,
            metabolismRotate: 0,
        }
        this.setData(this.data)
    }
    setData(data){
        this.pathData.find(p=>p.name=='protein').text.str = data.protein + '%'
        this.pathData.find(p=>p.name==='fat').text.str = data.fat + '%'
        this.pathData.find(p=>p.name==='metabolism').text.str = data.metabolism
        this.pathData.find(p=>p.name==='proteinRotate').transform.rotate.deg = this.rotateMath(data.proteinRotate,32,true)
        this.pathData.find(p=>p.name==='fatRotate').transform.rotate.deg = this.rotateMath(data.fatRotate,17,false)
        this.pathData.find(p=>p.name==='metabolismRotate').transform.rotate.deg = this.rotateMath(data.metabolismRotate,1000,true)
    }
    rotateMath(data,max,negative) { // 0~215
        const negativeValue = negative ? -1 : 1
        return negativeValue * ((data/max) * 215 + 5)
    }
    draw(){
        this.setData(this.data)
        this.drawPath(this.pathData)
    }
}