import $ from 'jquery'

const shop = 'slick-home-shop' 
const benner = 'slick-home-benner'
const evaluation = 'slick-home-evaluation'
const shopHome1 = 'slick-shop-home-1'
const shopHome2 = 'slick-shop-home-2'
const shopcartStep1 = 'slick-shopcart-step-1'

$(`#${benner}`).slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    arrows: true,
    responsive: [{
      breakpoint: 992,
      settings: {
        arrows: false,
      }
    }]
})

$(`#${shop}`).slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: true,
    arrows: true,
    responsive: [{
            breakpoint: 992,
            settings: {
              arrows: false,
              slidesToShow: 2,
              slidesToScroll: 2,
            }
        },{
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
})

$(`#${evaluation}`).slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    responsive: [{
      breakpoint: 576,
      settings: {
        arrows: false,
      }
    }]
})

$(`#${shopHome1}`).slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    responsive: [{
      breakpoint: 576,
      settings: {
        arrows: false,
      }
    }]
})
$(`#${shopHome2}`).slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    responsive: [{
      breakpoint: 576,
      settings: {
        arrows: false,
      }
    }]
})
$(`#${shopcartStep1}`).slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  dots: true,
  arrows: true,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        arrows: false,
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    },{
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
  ]
})