import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './Booking.module.css';
import './Booking.css'
import { CheckOutlined, CloseOutlined, UserOutlined, SmileOutlined, HomeOutlined, CloseSquareOutlined } from '@ant-design/icons'
import { datVeAction, getDanhSachPhongVeAction } from '../../redux/actions/QuanLyDatVeAction';
import _ from 'lodash';
import { ThongTinDatVe } from '../../_core/Models/ThongTinDatVe';

// tab antd
import { Tabs, Button } from 'antd';
import { layThongTinVaKetQuaDatVeAction } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';

// Translate
import { useTranslation } from 'react-i18next';
import { history } from '../../App';
import { TOKEN, USER_LOGIN } from '../../util/settings/config';
import { NavLink } from 'react-router-dom';

function Booking(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const { thongTinPhim, danhSachGhe } = useSelector(state => state.QuanLyDatVeReducer.danhSachPhongVe);

    const { danhSachGheDangDat } = useSelector(state => state.QuanLyDatVeReducer);

    const dispatch = useDispatch();

    useEffect(() => {

        const { id } = props.match.params;

        dispatch(getDanhSachPhongVeAction(id))

        return () => {
        }
    }, [])

    const renderGhe = () => {
        return danhSachGhe.map((ghe, index) => {

            let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
            let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';

            let classGheDangDat = '';

            let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe);
            if (indexGheDD !== -1) {
                classGheDangDat = 'gheDangDat'
            }

            let classGheDaDuocUserDangNhapDat = '';
            if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
                classGheDaDuocUserDangNhapDat = 'gheDaDuocUserDangNhapDat';
            }



            return <Fragment key={index}>
                <button
                    onClick={() => {
                        dispatch({
                            type: 'DAT_GHE',
                            gheDuocChon: ghe
                        })
                    }}

                    disabled={ghe.daDat} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocUserDangNhapDat} text-center`}>

                    {ghe.daDat && ghe.loaiGhe !== 'Vip' ? classGheDaDuocUserDangNhapDat !== '' ? <UserOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> : <CloseOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> : ghe.stt}

                </button>
                {(index + 1) % 16 === 0 ? <br /> : ''}
            </Fragment>
        })
    }


    return (
        <div className=" min-h-screen mt-5" >
            <div className="grid grid-cols-12">
                <div className="col-span-9">
                    <div className="flex flex-col items-center mt-5">

                        <div className="bg-black " style={{ width: '80%', height: 15 }}>
                        </div>
                        <div className={`${style['trapezoid']} text-center`}>
                            <h3 className="mt-3 text-black">Màn hình</h3>
                        </div>
                        <div>
                            {renderGhe()}
                        </div>
                    </div>

                    <div className="mt-5 flex justify-center">
                        <table className=" divide-y divide-gray-200 w-2/3">
                            <thead className="bg-gray-50 p-5">
                                <tr>
                                    <th>Ghế chưa đặt</th>
                                    <th>Ghế đang đặt</th>
                                    <th>Ghế vip</th>
                                    <th>Ghế đã đặt</th>
                                    <th>Ghế mình đặt</th>
                                    <th>Ghế khách đang đặt</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="text-center"><button className="ghe text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>
                                    <td className="text-center"><button className="ghe gheDangDat text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /></button> </td>
                                    <td className="text-center"><button className="ghe gheVip text-center"><CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /></button> </td>
                                    <td className="text-center"><button className="ghe gheDaDat text-center"> <CloseOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>
                                    <td className="text-center"><button className="ghe gheDaDuocUserDangNhapDat text-center"> <UserOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>
                                    <td className="text-center"><button className="ghe gheKhachDat text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="col-span-3">
                    <h3 className="text-green-400 text-center text-4xl">

                        {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                            return tongTien += ghe.giaVe;
                        }, 0).toLocaleString()}

                        đ</h3>
                    <hr />
                    <h3 className="text-2xl mt-2">{thongTinPhim.tenPhim}</h3>
                    <p>Địa điểm: {thongTinPhim.tenCumRap} - {thongTinPhim.diaChi} </p>
                    <p>Ngày chiếu: {thongTinPhim.ngayChieu} </p>
                    <hr />
                    <div className="flex flex-row my-5">
                        <div className="w-4/5">
                            <span className="text-red-400 text-lg">Ghế {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
                                return <span key={index}> <button style={{ marginRight: 0 }} className='ghe gheDangDat'>{gheDD.stt}</button></span>
                            })}</span>

                        </div>
                        <div className="text-left col-span-1">
                            <span className="text-green-800 text-sm">
                                {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                                    return tongTien += ghe.giaVe;
                                }, 0).toLocaleString()} đ
                            </span>
                        </div>
                    </div>
                    <hr />
                    <div className="my-5">
                        <i>Email</i> <br />
                        {userLogin.email}
                    </div>
                    <hr />
                    <div className="my-5">
                        <i>Phone</i> <br />
                        {userLogin.hoTen}
                    </div>
                    <hr />
                    <div className="mb-0 h-full flex flex-col items-center" style={{ marginBottom: 0 }}>
                        <div onClick={() => {

                            const thongTinDatVe = new ThongTinDatVe();
                            thongTinDatVe.maLichChieu = props.match.params.id;
                            thongTinDatVe.danhSachVe = danhSachGheDangDat;
                            console.log('thongTinDatVe', thongTinDatVe)

                            dispatch(datVeAction(thongTinDatVe))
                        }} className="bg-green-500 text-white w-full text-center py-3 font-bold text-2xl cursor-pointer">
                            ĐẶT VÉ
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


// Tab in antd
const { TabPane } = Tabs;

const PageDatVe = (props) => {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    // Lưu ý operations là 1 JSX chớ không phải 1 component
    const operations = <Fragment>
        {!_.isEmpty(userLogin) ?

            <Fragment>
                <button onClick={() => {
                    history.push('/profile')
                }}><div style={{ width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="text-xl ml-5 rounded-full hover:bg-gray-500 bg-gray-200">{userLogin.hoTen.substr(0, 1)}</div></button>

                <Button onClick={() => {
                    localStorage.removeItem(USER_LOGIN);
                    localStorage.removeItem(TOKEN);
                    history.push('/home');
                    window.location.reload();
                }} className="mr-2 ml-2 mb-2">Đăng xuất</Button>

            </Fragment> : ''}
    </Fragment>

    // Dùng useEffect dispatch activeTab lên reducer để khi vào trang này thì mặc định activeTab là 1

    useEffect(() => {

        dispatch({
            type: 'CHUYEN_TAB_ACTIVE',
            number: 1
        })

        return () => {
        }
    }, [])

    const { activeTab } = useSelector(state => state.QuanLyDatVeReducer);
    const dispatch = useDispatch();

    return <div className="p-5">
        <Tabs tabBarExtraContent={operations} defaultActiveKey="1" activeKey={activeTab.toString()} onChange={(key) => {
            dispatch({
                type: 'CHUYEN_TAB_ACTIVE',
                number: key
            })
        }}>
            <TabPane tab="01 CHỌN GHẾ VÀ THANH TOÁN" key="1">
                <Booking {...props} />
            </TabPane>
            <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
                <XuatKetQuaDatVe {...props} />
            </TabPane>
            <TabPane tab={<div> <NavLink to="/home"><HomeOutlined style={{ marginLeft: 10, fontSize: 25 }} /></NavLink> </div>} key="3">

            </TabPane>
        </Tabs>
    </div>
}

export default PageDatVe;

function XuatKetQuaDatVe(props) {

    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const { userLogin, thongTinVaKetQuaDatVe } = useSelector(state => state.QuanLyNguoiDungReducer);
    console.log("thongTinVaKetQuaDatVe", thongTinVaKetQuaDatVe)

    // const { danhSachGhe } = thongTinVaKetQuaDatVe;

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(layThongTinVaKetQuaDatVeAction());

        return () => {

        }
    }, [])

    const renderTicket = () => {
        return thongTinVaKetQuaDatVe.thongTinDatVe?.map((ticket, index) => {

            // Trong danhSachGhe có nhiều ghế cùng chung 1 vé nếu cùng 1 người đặt, nên mình sẽ chỉ lấy đại diện 1 ghế trong danhSachGhe đó để lấy thông tin

            const seats = _.first(ticket.danhSachGhe);


            return <Fragment key={index}>
                <div className="xl:w-1/4 md:w-1/2 p-4">
                    <div className="bg-gray-100 p-6 rounded-lg">
                        <img className="h-40 rounded w-full object-cover object-center mb-6" style={{ width: 720, height: 400 }} src={ticket.hinhAnh} alt="content" />
                        <h3 className="tracking-widest text-indigo-500 text-xl font-medium title-font">{ticket.tenPhim}</h3>
                        <p className="text-gray-500"><span className="font-bold">Giờ chiếu:</span> {moment(ticket.ngayDat).format('hh:mm A')} - <span className="font-bold">Ngày chiếu:</span>  {moment(ticket.ngayDat).format('DD-MM-YYYY')} .</p>
                        <h3 className="text-sm text-gray-900 font-medium title-font mb-4"><span className="font-bold">Địa điểm:</span> {seats.tenHeThongRap} - {seats.tenRap}</h3>
                        <p> <span className="font-bold">Ghế:</span> {ticket.danhSachGhe.map((ghe, index) => {
                            return <Fragment key={index}>
                                <span> - {ghe.tenGhe}</span>
                            </Fragment>
                        })}</p>
                        <p className="text-gray-500"><span className="font-bold">Thời lượng:</span> {ticket.thoiLuongPhim} - <span className="font-bold">Giá vé:</span>  {ticket.giaVe}.</p>
                    </div>
                </div>
            </Fragment>
        })
    }


    return <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full mb-20">
                <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">{t('Result')} {userLogin.hoTen}</h1>
                    <div className="h-1 w-60 bg-indigo-500 rounded" />
                    <button className="px-3 mr-2 py-3 border-2 border-black" type="button" onClick={() => changeLanguage('vi')}>
                        Vie
                    </button>
                    <button className="px-3 py-3 border-2 border-black" type="button" onClick={() => changeLanguage('en')}>
                        Eng
                    </button>
                </div>
                <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Một số điều lưu ý và cần nhắc đối với khách hàng</p>
            </div>
            <div className="flex flex-wrap -m-4">
                {renderTicket()}
            </div>
        </div>
    </section>

}
