import React, { useEffect } from 'react';
import './Detail.css';
// import '../../assets/styles/circle.css';
import { Tabs, Rate } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getThongTinChiTietPhimAction } from '../../redux/actions/QuanLyPhimAction';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { getThongTinLichChieuPhimAction } from '../../redux/actions/QuanLyRapAction';

export default function Detail(props) {

    const { phimDetail } = useSelector(state => state.QuanLyPhimReducer);

    const { lichChieuPhim } = useSelector(state => state.QuanLyRapReducer);
    console.log('lichChieuPhim', lichChieuPhim)

    const dispatch = useDispatch();

    useEffect(() => {

        const { id } = props.match.params;

        dispatch(getThongTinChiTietPhimAction(id));

        dispatch(getThongTinLichChieuPhimAction(id))

        return () => {

        }
    }, [])


    const { TabPane } = Tabs;
    return (
        <div className="App" style={{ backgroundImage: `url(${phimDetail.hinhAnh})`, height: '100%', width: '100%', display: 'flex' }}>
            <div style={{ height: '100%', width: '100%', paddingTop: 150 }} className="box2">

                <div className="grid grid-cols-12">
                    <div className="col-span-6 col-start-3">
                        <div className="grid grid-cols-2">
                            <img src={phimDetail.hinhAnh} alt="img"></img>
                            <div className="px-5 my-2">
                                <p className="text-sm">Ngày chiếu: {moment(phimDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                                <h1 className="text-white text-2xl">{phimDetail.tenPhim}</h1>
                                <p className="text-white">{phimDetail.moTa}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3 my-48">
                        <h1 style={{ marginLeft: '5%', color: 'yellow', fontWeight: 'bold', fontSize: 15 }}>Đánh giá</h1>
                        <h1 style={{ marginLeft: '5%' }} className="text-green-400 text-2xl"><Rate allowHalf value={phimDetail.danhGia / 2} style={{ color: '#78ed78', fontSize: 30 }} /></h1>
                        <div style={{ display: 'flex', textAlign: 'center', alignItems: 'center', marginLeft: 150 }} className={`c100 p${phimDetail.danhGia * 10} small green`}>
                            <span>{phimDetail.danhGia * 10}%</span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 ml-72 w-2/3 container bg-white px-5 py-5" >
                    <Tabs defaultActiveKey="1" className="text-left" >
                        <TabPane tab="Lịch chiếu" key="1" style={{ minHeight: 300 }}>
                            <div >
                                <Tabs tabPosition={'left'} >
                                    {lichChieuPhim.heThongRapChieu?.map((htr, index) => {
                                        return <TabPane
                                            tab={<div className="flex flex-row items-center justify-center">
                                                <img src={htr.logo} className="rounded-full w-full" style={{ width: 50 }} alt="..." />
                                                <div className="text-center ml-2">
                                                    {htr.tenHeThongRap}
                                                </div>
                                            </div>}
                                            key={index}>
                                            {htr.cumRapChieu?.map((cumRap, index) => {
                                                return <div className="mt-5" key={index}>
                                                    <div className="flex flex-row">
                                                        <img style={{ width: 60, height: 60 }} src={cumRap.hinhAnh} alt="..." />
                                                        <div className="ml-2">
                                                            <p style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 1 }} >{cumRap.tenCumRap}</p>
                                                            <p className="text-gray-400" style={{ marginTop: 0 }}>{cumRap.diaChi}</p>
                                                        </div>
                                                    </div>
                                                    <div className="thong-tin-lich-chieu grid grid-cols-4">
                                                        {cumRap.lichChieuPhim?.slice(0, 12).map((lichChieu, index) => {
                                                            return <NavLink to={`/booking/${lichChieu.maLichChieu}`} key={index} className="col-span-1 text-green-800 font-bold">
                                                                {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                            </NavLink>
                                                        })}
                                                    </div>
                                                </div>
                                            })}
                                        </TabPane>
                                    })}
                                </Tabs>
                            </div>
                        </TabPane>
                        <TabPane tab="Thông tin" key="2" style={{ minHeight: 300 }}>
                            Thông tin
                        </TabPane>
                        <TabPane tab="Đánh giá" key="3" style={{ minHeight: 300 }}>
                            Đánh giá
                        </TabPane>
                    </Tabs>
                </div>

                {/* <div className="my-10 container">
                    <Tabs tabPosition={'left'}>
                        <TabPane className="text-left" tab="Tab 1" key="1">
                            Content of Tab 1
                        </TabPane>
                        <TabPane className="text-left" tab="Tab 2" key="2">
                            Content of Tab 2
                        </TabPane>
                        <TabPane className="text-left" tab="Tab 3" key="3">
                            Content of Tab 3
                        </TabPane>
                    </Tabs>
                </div> */}

            </div>
        </div>
    )
}
