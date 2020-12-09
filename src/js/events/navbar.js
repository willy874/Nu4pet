import $ from 'jquery';
import * as lib from '@/library'
 

// variables
const desktop = {
    type: 'type-desktop',
    item: 'nav-list',
    panel: 'list-panel',
    link: 'nav-link',
    subItem: 'sub-item',
    subPanel: 'list-panel',
    subLink: 'icon-link',
    searchBar: 'search-bar',
}
const mobile = {
    type: 'type-mobile',
    btn: 'nav-btn',
    panel: 'nav-panel',
    subBtn: 'nav-sub-btn',
    navBack: 'nav-back',
    asideBtn: 'aside-btn',
    asideItem: 'aside-item',
    asidePanel: 'sub-panel',
    asideWidth: '260px'
}
// window event
$(window).on('load',()=>{
    const showAside = document.getElementById('shop-aside')
    if (showAside) {
        if (lib.isMobileDevice()) {
            $(showAside).addClass(mobile.type)
        }else{
            $(showAside).addClass(desktop.type)
        }
    }
})
$(window).on('resize',()=>{

    // aside 
    const showAside = document.getElementById('shop-aside')
    if (showAside) {
        const $asideItem = $(`.${mobile.asideItem}`)
        $asideItem.removeClass('active')
        const $asidePanel = $asideItem.children(`.${mobile.asidePanel}`)
        $asidePanel.attr('data-switch','false')
        if (lib.isMobileDevice()) {
            if ($(showAside).hasClass(desktop.type)) {
                $asidePanel.css('width','0')
                $asidePanel.hide()
                $(showAside).removeClass(desktop.type)
                $(showAside).addClass(mobile.type)
            }
        }else{
            if ($(showAside).hasClass(mobile.type)) {
                $asidePanel.css('width','auto')
                $asidePanel.hide()
                $(showAside).removeClass(mobile.type)
                $(showAside).addClass(desktop.type)
            }
        }
    }
})
// function
function asideSlideShow($target){
    $target.attr('data-switch','true')
    console.log($target);
    if (lib.isMobileDevice()) {
        $target.show()
        $target.animate({width: mobile.asideWidth},400)
    }else{
        $target.slideDown()
    }
}
function asideSlideHide($el){
    console.log($el);
    $el.attr('data-switch','false')
    if (lib.isMobileDevice()) {
        $el.animate({width: '0'},400,()=>{
            $el.hide()
        })
    }else{
        $el.slideUp()
    }
}
/**
 * Global Event
 */
// console.dir(document.activeElement);
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
                $el.parents(`.${mobile.asideItem}`).removeClass('active')
                asideSlideHide($el)
            }
        })
    }
})
$('a').on('click',(e)=>{
    const $target = $(e.target)
    const href = $target.attr('href')
    if (/^#/.test(href)) {
        e.preventDefault()
        $('html,body').animate({
            scrollTop: $(href).offset().top
        }, 1000);
    }
    if (/^javascript:/.test(href)) {
        e.preventDefault()
    }
    if (/^http/.test(href) && !(new RegExp(origin).test(href))) {
        e.preventDefault()
        window.open(href)
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
        $(`.${mobile.navBack}`).addClass('active')
        $target.slideDown()
    }else{
        $target.attr('data-switch','false')
        $(`.${mobile.navBack}`).removeClass('active')
        $target.slideUp()
    } 
    if (lib.isMobileDevice() ) {
        $(`.${mobile.asideItem}`).children(`.${mobile.asidePanel}`).each((index,el)=>{
            const $el = $(el)
            if ( $el.attr('data-switch') === 'true'){
                $el.parents(`.${mobile.asideItem}`).removeClass('active')
                asideSlideHide($el)
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
            $el.parents(`.${mobile.asideItem}`).removeClass('active')
            asideSlideHide($el)
        }
    })
    if ( $target.attr('data-switch') === 'false') {
        $this.parents(`.${mobile.asideItem}`).addClass('active')
        asideSlideShow($target)
    }else{
        $this.parents(`.${mobile.asideItem}`).removeClass('active')
        asideSlideHide($target)
    }
    if (lib.isMobileDevice() && $(`.${mobile.panel}`).attr('data-switch') === 'true' ) {
        $(`.${mobile.panel}`).attr('data-switch','false').slideUp()
        $(`.${mobile.navBack}`).removeClass('active')
    }
})
// Navbar Touch sub-panel Event
$(`.${mobile.asidePanel}`).each((index,el)=>{
    el.addEventListenerTouch('left',()=>{
        const $el = $(el)
        $el.parents(`.${mobile.asideItem}`).removeClass('active')
        asideSlideHide($el)
    })
})