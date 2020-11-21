import $ from 'jquery';

// variables
// const $searchForm = $('#search-form')
// const $searchBar = $('#search-bar')


// Global

$('body').on('click',(e)=>{
    const eventPath = e.originalEvent.path
    if ( !eventPath.some(dom=> dom === $('#search-bar')[0]) ) {
        $('#search-form').fadeOut()
        $('.icon-search').removeClass('focus')
    }
})

/**
 * Nav bar Event
 */
$('.nav-list').children('.nav-link')
.on('focus',(e)=>{
    const $this = $(e.target)
    const $target = $($this.attr('data-target'))

    $('.list-panel').each((index,el)=>{
        const $el = $(el)
        if ( $el.attr('data-switch') === 'true' ) {
            $el.stop(false,false).attr('data-switch','false').slideUp()
        }
    })
    if ($target.attr('data-switch') === 'false') {
        $target.attr('data-switch','true')
        $target.stop(false,false).slideDown()
        
    }
})
.on('mouseenter',(e)=>{
    const $this = $(e.target)
    const $target = $($this.attr('data-target'))
    if ($target.attr('data-switch') === 'false') {
        $target.attr('data-switch','true')
        $target.stop(false,false).slideDown()
        
    }
})
$('.nav-list').on('mouseleave',()=>{
    $('.list-panel').attr('data-switch','false').stop(false,false).slideUp()
})

/**
 * Search bar Event
 */
$('.icon-search')
.on('focus',(e)=>{
    if ( $(e.target).hasClass('focus')) {
        $('.icon-search').removeClass('focus')
        $('#search-form').fadeOut()
    }else{
        $(e.target).addClass('focus')
        $('.list-panel').attr('data-switch','false').stop(false,false).slideUp()
        $('#search-form').fadeIn()
        $('#search-form').children('input')[0].focus()
    }
    
})
$('#search-form').children('input[type=submit]').on('focus',()=>{
    $('#search-form').fadeOut()
    $('.icon-search').removeClass('focus')
})


// Member bar Event

$('#member-bar')
.on('mouseenter',()=>{
    const $target = $($('#member-bar').attr('data-target'))
    if ($target.attr('data-switch') === 'false') {
        $target.attr('data-switch','true')
        $target.stop(false,false).slideDown()
        
    }
})
.on('mouseleave',()=>{
    $('#panel-member').attr('data-switch','false').stop(false,false).slideUp()
})
.children('a').on('focus',()=>{
    const $target = $($('#member-bar').attr('data-target'))
    if ($target.attr('data-switch') === 'false') {
        $target.attr('data-switch','true')
        $target.stop(false,false).slideDown()
    }
})
.on('blur',()=>{
    const $target = $($('#member-bar').attr('data-target'))
    console.log( $target);
    if ($target.attr('data-switch') === 'true') {
        $target.attr('data-switch','false')
        $target.stop(false,false).slideUp()
    }
})

// Mobile Nav bar Event

$('#nav-btn').on('click',(e)=>{
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

$('.nav-sub-btn').on('click',(e)=>{
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

// Aside Nav bar Event
$('.aside-btn').on('click',(e)=>{
    const $this = $(e.target)
    const $target = $($this.attr('data-target'))
    if ( $target.attr('data-switch') === 'false') {
        $target.attr('data-switch','true')
        $target.animate({width: '320px'},400)
    }else{
        $target.attr('data-switch','false')
        $target.show()
        $target.animate({width: '0'},400,()=>{
            $target.hide()
        })
    }
})