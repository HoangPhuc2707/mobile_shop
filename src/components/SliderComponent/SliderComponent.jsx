import Slider from "react-slick";
import React from "react";
import { Image } from "antd";
import { WrapperSliderStyle } from "./style";
import { useNavigate } from "react-router-dom";

const SliderComponent = ({ arrImages }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };
    const navigate = useNavigate()
    const handleNavigateNews = () => {
        navigate('/news')
    }
    return (
        <WrapperSliderStyle {...settings}>
            {arrImages.map((image) => {
                return (
                    <Image onClick={handleNavigateNews} key={image} src={image} alt="slider" preview={false} width="100%" height="250px" />
                )
            })}
        </WrapperSliderStyle>
    );
};

export default SliderComponent