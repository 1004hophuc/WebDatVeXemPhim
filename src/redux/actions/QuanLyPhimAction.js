
import { history } from '../../App';
import { quanLyPhimService } from '../../services/QuanLyPhimService';
import { SET_DANH_SACH_PHIM } from '../types/QuanLyPhimType';

export const getDanhSachPhimAction = (tenPhim = '') => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layDanhSachPhim(tenPhim);
            dispatch({
                type: SET_DANH_SACH_PHIM,
                arrPhim: result.data.content
            })

        } catch (error) {
            console.log('error', error)
        }
    }
}

export const getThongTinChiTietPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layThongTinChiTietPhim(maPhim);
            dispatch({
                type: 'SET_THONG_TIN_CHI_TIET_PHIM',
                phimDetail: result.data.content
            })

        } catch (error) {
            console.log('error', error)
        }
    }
}

export const themPhimUpLoadHinhAction = (formData = new FormData()) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.themPhimUpLoadHinh(formData);
            alert('Thêm phim thành công!')
            console.log('result', result)
        } catch (error) {
            console.log('error', error)
        }
    }
}

export const getThongTinPhimAdminAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layThongTinPhimAdmin(maPhim);
            dispatch({
                type: 'SET_THONG_TIN_PHIM_ADMIN',
                thongTinPhimAdmin: result.data.content
            })

        } catch (error) {
            console.log('error', error)
        }
    }
}

export const capNhatPhimAdminAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.capNhatPhimAdmin(formData);
            alert('Cập nhật phim thành công!');
            console.log('resultCapNhat', result)

            dispatch(getDanhSachPhimAction());

            history.push('/admin/films');

        } catch (error) {
            console.log('error', error)
        }
    }
}

export const xoaPhimAdminAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.xoaPhimAdmin(maPhim);
            alert('Xoá phim thành công!');
            console.log('resultCapNhat', result)

            dispatch(getDanhSachPhimAction());

        } catch (error) {
            console.log('error', error)
        }
    }
}