import { GROUPID } from "../util/settings/config"
import { baseService } from "./baseService"

export class QuanLyRapService extends baseService {

    constructor() {
        super()
    }

    // Lấy danh sách toàn hệ thống rạp
    layDanhSachHeThongRap = () => {
        return this.get(`QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`)
    }

    layThongTinLichChieuPhim = (maPhim) => {
        return this.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
    }

    layThongTinCumRap = (maHeThongRap) => {
        return this.get(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
    }
}

export const quanLyRapService = new QuanLyRapService();
