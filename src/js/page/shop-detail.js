import $ from 'jquery'

const dom = document.querySelector('#shop-detail-modal')
if (dom) {
    const closeEventBind = ($els)=>{
        $els.forEach($el=>{
            $el.on('click',()=>{
                $('body').removeClass('modal-open')
                $('.modal').removeClass('show').fadeOut(200)
            })
        })
    }
    const $dom = $(dom)
    const $modal = $('.modal')
    const $modalDialog = $('.modal-dialog')
    const $price = $('.price-number')
    const price = Number($price.text())
    const $priceDel = $('.price-number-del')
    const priceDel = Number($priceDel.text())
    const $countBar = $('.count-bar').children('input')

    $dom.on('click',()=>{
        $('body').addClass('modal-open')
        $modal.addClass('show').fadeIn(200).on
    })
    
    $modalDialog.on('click',(e)=>e.stopPropagation())
    closeEventBind([
        $('.modal-close'),
        $modal
    ])
    $('.change-img').on('click',(e)=>{
        const src = $(e.target).children('img').attr('src')
        $('.prod-img').attr('src',src)
    })
    $('input[name="size"]').on('change',(e)=>{
        $('.size-data-display').html(e.target.value)
    })

    $('.icon-btn-minus').on('click',()=>{
        const numCount = Number($countBar.val())
        if (numCount) {
            $countBar.val(numCount - 1)
        }else{
            $countBar.val(0)
        }
        $price.html($countBar.val() * price)
        $priceDel.html($countBar.val() * priceDel)
    })
    $('.icon-btn-plus').on('click',()=>{
        const numCount = Number($countBar.val())
        if (numCount || numCount===0) {
            $countBar.val(numCount + 1)
        }else{
            $countBar.val(0)
        }
        $price.html($countBar.val() * price)
        $priceDel.html($countBar.val() * priceDel)
    })
    $countBar.on('input',()=>{
        const numCount = Number($countBar.val())
        if (numCount) {
            $countBar.val(numCount)
        }else{
            $countBar.val(0)
        }
        $price.html($countBar.val() * price)
        $priceDel.html($countBar.val() * priceDel)
    })
}


const shopcarts = document.querySelectorAll('#shopcart-modal')
shopcarts.forEach(el => {
    const closeEventBind = ($els)=>{
        $els.forEach($el=>{
            $el.on('click',()=>{
                $('body').removeClass('modal-open')
                $('.modal').removeClass('show').fadeOut(200)
            })
        })
    }
    const $el = $(el)
    const $modal = $('.modal')
    const $modalDialog = $('.modal-dialog')

    $el.on('click',()=>{
        $('body').addClass('modal-open')
        $modal.addClass('show').fadeIn(200).on
    })
    
    $modalDialog.on('click',(e)=>e.stopPropagation())
    closeEventBind([
        $('.modal-close'),
        $modal
    ])
})