import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import firebase from '../../../db/Firebase';
import 'firebase/compat/storage';

import './BasicSliderItems.scss';

const BasicSliderItems = ({ title, list, folder }) => {

    const settings = {
        dots: true,
        infinite: list.length > 5,
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
                    list.map(item => (
                        <ImageItem key={ item.id } item={ item } folder={ folder } />
                    ))
                }
            </Slider>
        </div>
    )
}

const ImageItem = ({ item, folder }) => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const imageRef = storageRef.child(`${folder}/${item.banner}`);
        imageRef.getDownloadURL().then(url => {
            setImage(url);
        });
    }, [item]);

    return (
        <Link to={ `/${folder}/${item.id}` }>
            <div className="basic-slider-items__list-item">
                <div className="avatar" style={ { backgroundImage: `url(${image})` } } />
                <h3> { item.name } </h3>
            </div>
        </Link>
    )
}
export default BasicSliderItems
