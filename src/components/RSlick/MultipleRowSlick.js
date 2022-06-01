import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import Film_Flip from "../Film/Film_Flip";
import styleSlick from './MultipleRowSlick.module.css';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
        </div>

    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{ ...style, display: "block", left: '-50px' }}
            onClick={onClick}
        >
        </div>
    );
}

const MultipleRowSlick = (props) => {

    const { arrPhim } = props;

    const dispatch = useDispatch();

    const { dangChieu, sapChieu } = useSelector(state => state.QuanLyPhimReducer);

    const renderFilms = () => {
        return arrPhim.map((phim, index) => {
            return <div className="mt-2" key={index}  >
                <Film_Flip phim={phim} />
            </div>
        })
    }
    let activeClassDC = dangChieu === true ? 'active_Film' : 'none_active_Film';

    let activeClassSC = sapChieu === true ? 'active_Film' : 'none_active_Film';

    // console.log('activeSC', activeClassSC)

    const settings = {
        className: "center variable-width",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 2,
        speed: 500,
        rows: 2,
        slidesPerRow: 2,
        variableWidth: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };



    return (
        <div>
            <div className="my-8">
                <button onClick={() => {
                    dispatch({
                        type: 'SET_PHIM_DANG_CHIEU'
                    })
                }} className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold rounded bg-gray-800 text-white border-gray-800 border-2 mr-1`}>PHIM ĐANG CHIẾU</button>
                <button onClick={() => {
                    dispatch({
                        type: 'SET_PHIM_SAP_CHIEU'
                    })
                }} className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold rounded bg-white text-gray-800 border-gray-800 border-2 ml-1`}>PHIM SẮP CHIẾU</button>
            </div>
            <Slider {...settings}>
                {renderFilms()}
            </Slider>
        </div>
    );
}


export default MultipleRowSlick;