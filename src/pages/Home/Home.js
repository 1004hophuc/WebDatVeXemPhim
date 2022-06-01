import React, { useEffect } from 'react';
import MultipleRowSlick from '../../components/RSlick/MultipleRowSlick';
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel';
import HomeMenu from './HomeMenu/HomeMenu';

// Kết nối redux
import { useSelector, useDispatch } from 'react-redux'
import { getDanhSachPhimAction } from '../../redux/actions/QuanLyPhimAction';
import { getDanhSachHeThongRapAction } from '../../redux/actions/QuanLyRapAction';

export default function Home(props) {
    // console.log('propsHome', props)

    const dispatch = useDispatch();

    const { arrPhim } = useSelector(state => state.QuanLyPhimReducer);

    const { arrHeThongRap } = useSelector(state => state.QuanLyRapReducer);

    useEffect(() => {
        // Lấy danh sách phim
        dispatch(getDanhSachPhimAction());

        // Lấy danh sách toàn bộ hệ thống rạp
        dispatch(getDanhSachHeThongRapAction())

        return () => {
        }
    }, [])

    return (
        <div>
            <HomeCarousel />

            <section className="text-gray-600 body-font" >
                <div className="container px-5 py-5 mx-auto " >
                    <MultipleRowSlick arrPhim={arrPhim} />
                </div>
            </section>

            <div className="mx-36">
                <HomeMenu arrHeThongRap={arrHeThongRap} />
            </div>
        </div>
    )
}
