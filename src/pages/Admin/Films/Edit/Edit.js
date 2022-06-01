import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { GROUPID } from '../../../../util/settings/config';
import { getThongTinPhimAdminAction, capNhatPhimAdminAction } from '../../../../redux/actions/QuanLyPhimAction';

const Edit = (props) => {
    // const [componentSize, setComponentSize] = useState('default');
    const [imgSrc, setImgSrc] = useState('');
    const dispatch = useDispatch();

    const { thongTinPhimAdmin } = useSelector(state => state.QuanLyPhimReducer);
    console.log('thongTinPhimAdmin', thongTinPhimAdmin)

    let { tenPhim, trailer, moTa, ngayKhoiChieu, dangChieu, sapChieu, hot, danhGia, hinhAnh, maPhim } = thongTinPhimAdmin

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: maPhim,
            tenPhim: tenPhim,
            trailer: trailer,
            moTa: moTa,
            ngayKhoiChieu: ngayKhoiChieu,
            dangChieu: dangChieu,
            sapChieu: sapChieu,
            hot: hot,
            danhGia: danhGia,
            hinhAnh: null,
        },

        // Để hình ảnh null cho việc nếu người dùng không thay đổi field hình ảnh thì useFormik sẽ tự động hiểu và để lại hình ảnh cũ

        onSubmit: (values) => {
            console.log('values', values);
            values.maNhom = GROUPID;
            //Tạo đối tượng formdata => Đưa giá trị values từ formik vào formdata
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    if (values.hinhAnh !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name);
                    }
                }
            }

            // Call action API cập nhật phim
            dispatch(capNhatPhimAdminAction(formData))

        }
    })

    const handleChangeDatePicker = (value) => {
        // console.log('datepickerchange',);
        let ngayKhoiChieu = moment(value);
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu);

    }

    const handleChangeSwitch = (name) => {

        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeInputNumber = (name) => {
        return (value) => {
            formik.setFieldValue(name, value);
        }
    }

    const handleChangeFile = async (e) => {
        //Lấy file ra từ e
        let file = e.target.files[0];
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {

            //Đem dữ liệu file lưu vào formik
            // Đảm bảo việc này phải load ra rồi thì sau đó người dùng mới thao tác được
            await formik.setFieldValue('hinhAnh', file);

            //Tạo đối tượng để đọc file
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                console.log('setImgSrc', e.target.result);
                setImgSrc(e.target.result);//Hình base 64
                console.log('setImgSrc', setImgSrc)
            }

        }
    }


    const onFormLayoutChange = ({ size }) => {
        // setComponentSize(size);
    };

    useEffect(() => {

        const { id } = props.match.params;

        dispatch(getThongTinPhimAdminAction(id))

        return () => {
        }
    }, [])


    return (
        <>

            <Form
                onSubmitCapture={formik.handleSubmit}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
            // initialValues={{
            //     size: componentSize,
            // }}
            // onValuesChange={onFormLayoutChange}
            // size={componentSize}
            >
                <h3>Thêm mới phim </h3>
                <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Tên phim">
                    <Input name="tenPhim" value={formik.values.tenPhim} onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name="trailer" value={formik.values.trailer} onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Mô tả">
                    <Input name="moTa" value={formik.values.moTa} onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker format={"DD/MM/YYYY"} value={moment(formik.values.ngayKhoiChieu)} onChange={handleChangeDatePicker} />
                </Form.Item>
                <Form.Item label="Đang chiếu" >
                    <Switch name="dangChieu" checked={formik.values.dangChieu} onChange={handleChangeSwitch('dangChieu')} />
                </Form.Item>
                <Form.Item label="Sắp chiếu">
                    <Switch checked={formik.values.sapChieu} name="sapChieu" onChange={handleChangeSwitch('sapChieu')} />
                </Form.Item>
                <Form.Item label="Hot">
                    <Switch checked={formik.values.hot} name="hot" onChange={handleChangeSwitch('hot')} />
                </Form.Item>

                <Form.Item label="Số sao">
                    <InputNumber value={formik.values.danhGia} onChange={handleChangeInputNumber('danhGia')} min={1} max={10} />
                </Form.Item>

                <Form.Item label="Hình ảnh">
                    <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
                    <br />
                    <img style={{ width: 150, height: 150 }} src={imgSrc === '' ? hinhAnh : imgSrc} alt="..." />


                </Form.Item>
                <Form.Item label="Tác vụ">
                    <button type="submit" className="bg-blue-300 text-white p-2">Cập nhật</button>
                </Form.Item>
            </Form>
        </>
    );
};



export default Edit;