import React from "react"
import Slider from "react-slick"

import cl from "./Slider.module.scss"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import slide1 from "./img/slide1.jpg"
import slide2 from "./img/slide2.jpg"
import slide3 from "./img/slide3.jpg"
import slide4 from "./img/slide4.jpg"
import slide5 from "./img/slide5.jpg"

const SliderSlick = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		autoplay: true,
		autoplaySpeed: 8000,
		slidesToShow: 1,
		slidesToScroll: 1,
	}

	return (
		<div className={cl.slider}>
			<Slider {...settings}>
				<div>
					<a href="#">
						<img src={slide1} alt="Slide 1" />
					</a>
				</div>
				<div>
					<a href="#"><img src={slide2} alt="Slide 2" /></a>
				</div>
				<div>
					<a href="#"><img src={slide3} alt="Slide 3" /></a>
				</div>
				<div>
					<a href="#"><img src={slide4} alt="Slide 4" /></a>
				</div>
				<div>
					<a href="#"><img src={slide5} alt="Slide 5" /></a>
				</div>
			</Slider>
		</div>
	)
}

export default SliderSlick
