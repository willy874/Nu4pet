import $ from 'jquery';
import * as lib from '@/library'
 
// variables
const desktop = {
    item: 'nav-list',
    panel: 'list-panel',
    link: 'nav-link',
    subItem: 'sub-item',
    subPanel: 'list-panel',
    subLink: 'icon-link',
    searchBar: 'search-bar',
}
const mobile = {
    btn: 'nav-btn',
    panel: 'nav-panel',
    subBtn: 'nav-sub-btn',
    asideBtn: 'aside-btn',
    asideItem: 'aside-item',
    asidePanel: 'sub-panel',
    asideWidth: '420px'
}
// console.dir(document.activeElement);
/**
 * Global Event
 */
$('body').on('click',(e)=>{ 
    // 在手機上不會觸發該事件

    const $this = $(e.target)
    // const $target = $($this.attr('data-target'))
    const eventPath = e.originalEvent.path

    // search bar
    if ( !eventPath.some(dom=> dom === $('#search-bar')[0]) ) {
        $('#search-form').fadeOut(250)
        $('.icon-search').removeClass('focus')
    }

    if (!eventPath.some(dom=> dom === $this.parents(`.${mobile.asideItem}`)[0])) {
        $(`.${mobile.asideItem}`).children(`.${mobile.asidePanel}`).each((index,el)=>{
            const $el = $(el)
            if ( $el.attr('data-switch') === 'true'){
                console.log($el);
                $el.attr('data-switch','false')
                $el.animate({width: '0'},400,()=>{
                    $el.hide()
                })
            }
        })
    }
})

$('a,button,input').on('focus',(e)=>{
    const $this = $(e.target)
    const $prevFocus = document.prevFocus ? $(document.prevFocus) : $('body')
    const isFocusActive = (strElement)=>{
        const _this = $prevFocus.parents(`.${strElement}`)[0]
        const _prev = $this.parents(`.${strElement}`)[0]
        if (_this !== undefined && _prev !== undefined) {
            return _this === _prev
        }
    }
    if (isFocusActive(desktop.item) || isFocusActive(desktop.subItem)) {
        const $target = $($this.attr('data-target'))
        if ($target[0] && $target.attr('data-switch') === 'false') {
            $target.attr('data-switch','true')
            $target.stop(false,false).fadeIn(250)
        }
    }else{
        $(`.${desktop.panel}`).each((index,el)=>{
            const $el = $(el)
            if ($el.attr('data-switch') === 'true') {
                console.log($el);
                $el.attr('data-switch','false')
                $el.stop(false,false).fadeOut(250)
            }
        })
        const $target = $($this.attr('data-target'))
        if ( $target[0] 
            && ( $this.hasClass(desktop.link) || $this.hasClass(desktop.subLink) ) 
            && $target.attr('data-switch') === 'false'
        ) {
            $target.attr('data-switch','true')
            $target.stop(false,false).fadeIn(250)
        }
    }
    document.prevFocus = e.target
})

/**
 * Nav bar Event
 */
$(`.${desktop.item}`)
.on('mouseleave',()=>{
    $(`.${desktop.panel}`).attr('data-switch','false').stop(false,false).fadeOut(250)
})
.children(`.${desktop.link}`).on('mouseenter',(e)=>{
    const $this = $(e.target)
    const $target = $($this.attr('data-target'))
    if ($target.attr('data-switch') === 'false') {
        $target.attr('data-switch','true')
        $target.stop(false,false).fadeIn(250)
        
    }
})

$(`.${desktop.subItem}`)
.on('mouseleave',()=>{
    $(`.${desktop.subPanel}`).attr('data-switch','false').stop(false,false).fadeOut(250)
})
.children(`.${desktop.subLink}`).on('mouseenter',(e)=>{
    const $this = $(e.target)
    const $target = $($this.attr('data-target'))
    if ($target.attr('data-switch') === 'false') {
        $target.attr('data-switch','true')
        $target.stop(false,false).fadeIn(250)
    }
})

/**
 * Search bar Event
 */
$('.icon-search')
.on('focus',(e)=>{
    if ( $(e.target).hasClass('focus')) {
        $('.icon-search').removeClass('focus')
        $('#search-form').fadeOut(250)
    }else{
        $(e.target).addClass('focus')
        $(`.${desktop.panel}`).attr('data-switch','false').stop(false,false).fadeOut(250)
        $('#search-form').fadeIn(250)
        $('#search-form').children('input')[0].focus()
    }
    
})
$('#search-form').children('input[type=submit]').on('focus',()=>{
    $('#search-form').fadeOut()
    $('.icon-search').removeClass('focus')
})


// Mobile Event
$(`.${mobile.subBtn}`).on('click',(e)=>{
    const $this = $(e.target)
    const $target = $($this.attr('data-target'))
    if ( $target.attr('data-switch') === 'false') {
        $target.attr('data-switch','true')
        $target.slideDown()
    }else{
        $target.attr('data-switch','false')
        $target.slideUp()
    }
})
// Mobile Navbar
$(`.${mobile.btn}`).on('click',(e)=>{
    const $this = $(e.target)
    const $target = $($this.attr('data-target'))
    if ( $target.attr('data-switch') === 'false') {
        $target.attr('data-switch','true')
        $target.slideDown()
    }else{
        $target.attr('data-switch','false')
        $target.slideUp()
    }
    if (lib.isMobileDevice() ) {
        $(`.${mobile.asideItem}`).children(`.${mobile.asidePanel}`).each((index,el)=>{
            const $el = $(el)
            if ( $el.attr('data-switch') === 'true'){
                console.log($el);
                $el.attr('data-switch','false')
                $el.animate({width: '0'},400,()=>{
                    $el.hide()
                })
            }
        })
    }
})
// Mobile Aside Navbar
$(`.${mobile.asideBtn}`).on('click',(e)=>{
    const $this = $(e.target)
    const $target = $($this.attr('data-target'))
    $(`.${mobile.asideItem}`).children(`.${mobile.asidePanel}`).each((index,el)=>{
        const $el = $(el)
        if ( $el.attr('data-switch') === 'true' && $target[0] !== $el[0]){
            $el.attr('data-switch','false')
            $el.animate({width: '0'},400,()=>{
                $el.hide()
            })
        }
    })
    if ( $target.attr('data-switch') === 'false') {
        $target.attr('data-switch','true')
        console.log($target);
        $target.show()
        $target.animate({width: mobile.asideWidth},400)
    }else{
        $target.attr('data-switch','false')
        $target.animate({width: '0'},400,()=>{
            $target.hide()
        })
    }
    if (lib.isMobileDevice() && $(`.${mobile.panel}`).attr('data-switch') === 'true' ) {
        $(`.${mobile.panel}`).attr('data-switch','false').slideUp()
    }
})
// Navbar Touch sub-panel Event
$(`.${mobile.asidePanel}`).each((index,el)=>{
    el.addEventListenerTouch('left',()=>{
        const $this = $(el)
        $this.attr('data-switch','false')
        $this.animate({width: '0'},400,()=>{
            $this.hide()
        })
    })
})