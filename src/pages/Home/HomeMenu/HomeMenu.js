import React, { Fragment, useState } from 'react';
import { Tabs } from 'antd';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
const { TabPane } = Tabs;

function HomeMenu(props) {

    const { arrHeThongRap } = props;

    const [state, setState] = useState({ tabPosition: 'left' });

    const changeTabPosition = e => {
        setState({ tabPosition: e.target.value });
    }

    const renderDanhSachHeThongRap = () => {
        return arrHeThongRap?.map((heThongRap, index) => {
            return <TabPane tab={<img src={heThongRap.logo} width="50" alt="img" className="rounded-full"></img>} key={index}>

                <Tabs tabPosition={tabPosition}>
                    {heThongRap?.lstCumRap.slice(0, 6).map((cumRap, index) => {
                        return <TabPane tab={

                            <div style={{ width: '300px', display: 'flex' }}>
                                <div>
                                    <img src="https://s3img.vcdn.vn/123phim/2018/09/ddc-dong-da-15379624326697.jpg" alt="img" width="50" className="rounded-full"></img>
                                </div>
                                <br />
                                <div className="text-left ml-2">
                                    {cumRap.tenCumRap}
                                    <p className="text-red-200">Chi tiết</p>
                                </div>
                            </div>

                        } key={index}>

                            {/* Load phim tương ứng với mỗi rạp ra */}
                            {cumRap.danhSachPhim.slice(0, 6).map((phim, index) => {
                                return <Fragment key={index}>
                                    <div className="my-5">
                                        <div style={{ display: 'flex' }}>

                                            <div>
                                                <img style={{ height: 75, width: 75 }} src={phim.hinhAnh} alt={phim.tenPhim} onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/75/75" }} />
                                            </div>
                                            <div className="ml-2">
                                                <h1 className="text-2xl text-green-700" >{phim.tenPhim}</h1>
                                                <p>{cumRap.diaChi}</p>
                                                <div className="grid grid-cols-6 gap-6">
                                                    {phim.lstLichChieuTheoPhim?.slice(0, 6).map((lichChieu, index) => {
                                                        return <NavLink className="text-sm text-green-400" to={`/booking/${lichChieu.maLichChieu}`} key={index}>
                                                            {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                        </NavLink>
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </Fragment>
                            })}

                        </TabPane>
                    })}
                </Tabs>

            </TabPane>
        })
    }

    const { tabPosition } = state;
    return (
        <>
            <Tabs tabPosition={tabPosition}>
                {renderDanhSachHeThongRap()}
            </Tabs>
        </>
    )
}

export default HomeMenu