import $ from 'jquery'

const shop = 'slick-home-shop' 
const benner = 'slick-home-benner'
const evaluation = 'slick-home-evaluation'

$(`#${benner}`).slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
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