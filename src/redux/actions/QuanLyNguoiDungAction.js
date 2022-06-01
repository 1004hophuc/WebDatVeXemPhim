import { history } from "../../App";
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { DANG_NHAP_ACTION } from "../types/QuanLyNguoiDungType";


export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);

            if (result.data.statusCode === 200) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                });

                //Chuyển hướng đăng nhập về trang trước đó
                history.goBack();
            }
        } catch (error) {
            console.log('error', error.response.data)
        }
    }
}

export const layThongTinVaKetQuaDatVeAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layThongTinVaKetQuaDatVe();

            if (result.data.statusCode === 200) {
                dispatch({
                    type: 'THONG_TIN_VA_KET_QUA_DAT_VE',
                    thongTinVaKetQuaDatVe: result.data.content
                });
            }
        } catch (error) {
            console.log('error', error.response.data)
        }
    }
}