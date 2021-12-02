import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import firebase from '../../../db/Firebase';
import 'firebase/compat/storage';

import './BasicSliderItems.scss';

const BasicSliderItems = ({ title, artists }) => {

    const settings = {
        dots: true,
        infinite: artists.length > 5,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        className: 'basic-slider-items__list',
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
    };

    return (
        <div className="basic-slider-items">
            <h2> { title } </h2>
            <Slider { ...settings }>
                {
                    artists.map(artist => (
                        <ArtistItem key={ artist.id } artist={ artist } />
                    ))
                }
            </Slider>
        </div>
    )
}

const ArtistItem = ({ artist }) => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const imageRef = storageRef.child(`artists/${artist.banner}`);
        imageRef.getDownloadURL().then(url => {
            setImage(url);
        });
    }, [artist]);

    return (
        <div className="basic-slider-items__list-item">
            <div className="avatar" style={ { backgroundImage: `url(${image})` } } />
            <h3> { artist.name } </h3>
        </div>
    )
}
export default BasicSliderItems
