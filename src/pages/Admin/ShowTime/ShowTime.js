import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Checkbox, Select } from 'antd';
import { DatePicker } from 'antd';
import { InputNumber } from 'antd';
import { quanLyRapService } from '../../../services/QuanLyRapService';
import { useFormik } from 'formik';
import moment from 'moment';
import { quanLyDatVeService } from '../../../services/QuanLyDatVeService';
import { history } from '../../../App';
// import { quanLyDatVeService } from '../../../services/QuanLyDatVeService';

export default function ShowTime(props) {

    const formik = useFormik({
        initialValues: {
            maPhim: props.match.params.id,
            ngayChieuGioChieu: '',
            maRap: '',
            giaVe: ''
        },
        onSubmit: async (values) => {
            console.log('valuesSubmit', values)
            try {
                const result = await quanLyDatVeService.taoLichChieu(values);
                alert(result.data.content)

                history.push(`/detail/${formik.values.maPhim}`)
            } catch (error) {
                console.log('error', error.response?.data)
            }
        }
    })

    console.log('props', props.match.params)

    const [state, setState] = useState({
        heThongRapChieu: [],
        cumRapChieu: []
    })

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await quanLyRapService.layDanhSachHeThongRap();
                console.log('heThongRapChieu', result.data.content)

                setState({
                    ...state,
                    heThongRapChieu: result.data.content
                })

            } catch (error) {
                console.log('error', error.response?.data)
            }
        }
        fetchData();
    }, [])

    // useEffect(async () => {
    //     try {
    //         let result = await quanLyRapService.layThongTinHeThongRap();
    //         setState({
    //             ...state,
    //             heThongRapChieu: result.data.content
    //         })

    //     } catch (error) {
    //         console.log('')
    //     }


    // }, [])

    const handleChangeHeThongRap = async (value) => {
        try {

            let result = await quanLyRapService.layThongTinCumRap(value)
            // G??n gi?? tr??? l???y ???????c v??o state.cumRapChieu

            console.log('cumRapChieu', result.data.content)

            setState({
                ...state,
                cumRapChieu: result.data.content
            })

        } catch (error) {
            console.log('error', error.response?.data)
        }
    }

    const handleChangeCumRap = (value) => {
        formik.setFieldValue('maRap', value)
    }

    const onOk = (values) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'))
        console.log('values', moment(values).format('DD/MM/YYYY hh:mm:ss'));
    }

    const onChangeDate = (values) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'))
    }

    const onchangeInputNumber = (value) => {
        formik.setFieldValue('giaVe', value)
    }

    const mapHeThongRap = () => {
        return state.heThongRapChieu?.map((htr, index) => {
            return { label: htr.tenHeThongRap, value: htr.tenHeThongRap }
        })
    }

    const mapCumRap = () => {
        return state.cumRapChieu?.map((cumRap, index) => {
            return { label: cumRap.tenCumRap, value: cumRap.maCumRap }
        })
    }

    let filmParams = {};
    if (localStorage.getItem('filmParams')) {
        filmParams = JSON.parse(localStorage.getItem('filmParams'))
    }

    return (
        <div className="container">
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onSubmitCapture={formik.handleSubmit}

            >
                <h3 className="text-2xl">T???o l???ch chi???u phim - {filmParams.tenPhim} </h3>
                <img src={filmParams.hinhAnh} alt='...' width={200} height={100} />
                <Form.Item label="H??? th???ng r???p">
                    <Select options={mapHeThongRap()} onChange={handleChangeHeThongRap} placeholder="Ch???n h??? th???ng r???p" />
                </Form.Item>


                <Form.Item label="C???m r???p">
                    <Select options={mapCumRap()} onChange={handleChangeCumRap} placeholder="Ch???n c???m r???p" />
                </Form.Item>

                <Form.Item label="Ng??y chi???u gi??? chi???u">
                    <DatePicker format="DD/MM/YYYY hh:mm:ss a" showTime onChange={onChangeDate} onOk={onOk} />
                </Form.Item>

                <Form.Item label="Gi?? v??">
                    <InputNumber onChange={onchangeInputNumber} />
                </Form.Item>
                <Form.Item label="Ch???c n??ng">
                    <Button htmlType="submit">T???o l???ch chi???u</Button>
                </Form.Item>
            </Form>
        </div>
    )
}