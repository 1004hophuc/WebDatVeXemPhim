
/*
- Lấy được thông tin người dùng rồi thì đưa lên reducer để nó giữ, để tiện cho việc lấy ra thông tin người dùng.
- Khi đưa lên reducer, mình lưu nó vào luôn localStorage,để người dùng nếu lỡ tắt máy thì khi mở lại thông tin vẫn còn ở trong local store.

- Đầu tiên kiểm tra xem trong local store có lưu thông tin chưa, nếu có thì lấy ra gán lên cho reducer

*/

import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { DANG_NHAP_ACTION } from "../types/QuanLyNguoiDungType";

let user = {}

if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const initialState = {
    userLogin: user,
    thongTinVaKetQuaDatVe: {},
}

const QuanLyNguoiDungReducer = (state = initialState, action) => {
    switch (action.type) {

        case DANG_NHAP_ACTION: {
            const { thongTinDangNhap } = action;
            localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
            localStorage.setItem(TOKEN, thongTinDangNhap.accessToken);
            return { ...state, userLogin: thongTinDangNhap };
        }

        case 'THONG_TIN_VA_KET_QUA_DAT_VE': {
            state.thongTinVaKetQuaDatVe = action.thongTinVaKetQuaDatVe
            return { ...state }
        }

        default:
            return state
    }
}
export default QuanLyNguoiDungReducer
