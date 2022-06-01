import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Carousel } from 'antd';
import { getCarouselAction } from '../../../../redux/actions/CarouselAction';
import './HomeCarousel.css'

const contentStyle = {
    height: '600px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundPosition: 'center',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat'
};

export default function HomeCarousel(props) {

    const arrImageCarousel = useSelector(state => state.CarouselReducer.arrImageCarousel)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCarouselAction())

        return () => {
        }
    }, [])

    const renderImageCarousel = () => {
        return arrImageCarousel?.map((item, index) => {
            return <div key={index}>
                <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}>
                    <img src={item.hinhAnh} alt="img" className="w-full opacity-0"></img>
                </div>
            </div>
        })
    }

    return (
        <Carousel effect="fade">
            {renderImageCarousel()}
        </Carousel>
    )
}
