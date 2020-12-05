import $ from 'jquery'

const shop = 'slick-home-shop' 
const benner = 'slick-home-benner'

$(`#${benner}`).slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // dots: true,
    arrows: false,
})

$(`#${shop}`).slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3
          }
        },{
            breakpoint: 992,
            settings: {
              slidesToShow: 2
            }
        },{
          breakpoint: 576,
          settings: {
            slidesToShow: 1
          }
        }
      ]
})