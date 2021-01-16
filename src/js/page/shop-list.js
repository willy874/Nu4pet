~function (){
    const listTimerDom = document.querySelectorAll('.countdown-timer')
    listTimerDom.forEach(dom => {
        const initTimer = {
            horus: dom.getAttribute('data-horus'),
            minutes: dom.getAttribute('data-minutes'),
            seconds: dom.getAttribute('data-seconds')
        }
        const initDate = Date.now()
        const getTimeString = (t)=>{
            if (t <= 0) {
                return '00'
            }
            if (t <= 9 && t > 0) {
                return '0' + t
            }
            return String(t)
        }
        setInterval(()=>{
            const numDateNow = Date.now()
            const numElapsedTime = Math.ceil(numDateNow/1000) - Math.ceil(initDate/1000)
            const numCountdownTimer =  initTimer.horus*3600 + initTimer.minutes*60 + initTimer.seconds*1
            const numNowTimer = numCountdownTimer - numElapsedTime
            const nowTimer = {
                horus: getTimeString(Math.ceil(numNowTimer/3600 - 1)),
                minutes: getTimeString(Math.ceil(numNowTimer%3600/60 - 1)),
                seconds: getTimeString(numNowTimer%3600%60)
            }
            dom.querySelector('.svg-horus-0').innerHTML = nowTimer.horus[0]
            dom.querySelector('.svg-horus-1').innerHTML = nowTimer.horus[1]
            dom.querySelector('.svg-minutes-0').innerHTML = nowTimer.minutes[0]
            dom.querySelector('.svg-minutes-1').innerHTML = nowTimer.minutes[1]
            dom.querySelector('.svg-seconds-0').innerHTML = nowTimer.seconds[0]
            dom.querySelector('.svg-seconds-1').innerHTML = nowTimer.seconds[1]
        },1000)
    })
}()