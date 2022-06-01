import { quanLyRapService } from "../../services/QuanLyRapService"
import { SET_DANH_SACH_HE_THONG_RAP, SET_THONG_TIN_LICH_CHIEU_PHIM } from "../types/QuanLyRapType";


export const getDanhSachHeThongRapAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyRapService.layDanhSachHeThongRap();
            dispatch({
                type: SET_DANH_SACH_HE_THONG_RAP,
                arrHeThongRap: result.data.content
            })

        } catch (error) {
            console.log('error', error)
        }
    }
}

export const getThongTinLichChieuPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyRapService.layThongTinLichChieuPhim(maPhim);
            console.log('result', result)
            dispatch({
                type: SET_THONG_TIN_LICH_CHIEU_PHIM,
                lichChieuPhim: result.data.content
            })

        } catch (error) {
            console.log('error', error)
        }
    }
}