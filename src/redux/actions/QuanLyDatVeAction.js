import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { ThongTinDatVe } from "../../_core/Models/ThongTinDatVe";

export const getDanhSachPhongVeAction = (maLichChieu) => {
    return async (dispatch) => {
        try {
            const result = await quanLyDatVeService.layDanhSachPhongVe(maLichChieu);
            dispatch({
                type: 'SET_DANH_SACH_PHONG_VE',
                danhSachPhongVe: result.data.content
            })

        } catch (error) {
            console.log('error', error)
        }
    }
}

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
    return async (dispatch) => {
        try {

            dispatch({
                type: 'SHOW_LOADING'
            })

            const result = await quanLyDatVeService.datVe(thongTinDatVe);
            console.log('resultThongTinDatVe', result)
            // await dispatch({
            //     type: 'DAT_VE',
            //     thongTinDatVe: result.data.content
            // })
            // Sau khi đặt thì load lại action layDanhSachPhongVe và truyền vào tham số là maLichChieu
            await dispatch(getDanhSachPhongVeAction(thongTinDatVe.maLichChieu));

            await dispatch({ type: 'DAT_VE_HOAN_TAT' });

            await dispatch({ type: 'HIDE_LOADING' })

            // Tắt loading xong chuyển tab
            dispatch({
                type: 'CHUYEN_TAB_KHI_DAT_VE_XONG'
            })

        } catch (error) {
            console.log('error', error.response)
        }
    }
}