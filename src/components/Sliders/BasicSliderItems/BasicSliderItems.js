import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './BasicSliderItems.scss';

const BasicSliderItems = ({ title, artists }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        className: 'basic-slider-items__list',
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        // arrows: false,
    }

    return (
        <div className="basic-slider-items">
            <div>
                <h2> { title } </h2>
                <Slider { ...settings }>
                    <div>
                        <h3>1</h3>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                    <div>
                        <h3>5</h3>
                    </div>
                    <div>
                        <h3>6</h3>
                    </div>
                    <div>
                        <h3>7</h3>
                    </div>
                    <div>
                        <h3>8</h3>
                    </div>
                    <div>
                        <h3>9</h3>
                    </div>
                </Slider>
            </div>
        </div>
    )
}

export default BasicSliderItems
