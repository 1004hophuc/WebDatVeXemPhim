
import { baseService } from "./baseService"

export class QuanLyNguoiDungService extends baseService {

    constructor() {
        super()
    }

    // Lấy thông tin đăng nhập của user gồm taiKhoan và matKhau
    dangNhap = (thongTinDangNhap) => {
        return this.post(`QuanLyNguoiDung/DangNhap`, thongTinDangNhap)
    }

    layThongTinVaKetQuaDatVe = () => {
        return this.post(`QuanLyNguoiDung/ThongTinTaiKhoan`)
    }
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();