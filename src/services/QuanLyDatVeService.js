import { ThongTinDatVe } from "../_core/Models/ThongTinDatVe"
import { baseService } from "./baseService"

export class QuanLyDatVeService extends baseService {

    constructor() {
        super()
    }

    // Lấy thông tin đăng nhập của user gồm taiKhoan và matKhau
    layDanhSachPhongVe = (maLichChieu) => {
        return this.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
    }

    datVe = (thongTinDatVe = new ThongTinDatVe()) => {
        return this.post(`QuanLyDatVe/DatVe`, thongTinDatVe)
    }

    taoLichChieu = (values) => {
        return this.post(`QuanLyDatVe/TaoLichChieu`, values)
    }
}

export const quanLyDatVeService = new QuanLyDatVeService();