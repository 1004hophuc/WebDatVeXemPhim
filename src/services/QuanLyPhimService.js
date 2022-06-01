import { GROUPID } from "../util/settings/config"
import { baseService } from "./baseService"

export class QuanLyPhimService extends baseService {

    constructor() {
        super()
    }

    // Lấy danh sách banner
    layDanhSachBanner = () => {
        return this.get(`QuanLyPhim/LayDanhSachBanner`)
    }

    layDanhSachPhim = (tenPhim = '') => {
        if (tenPhim.trim() !== '') {
            return this.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`)
        }
        return this.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`)
    }

    layThongTinChiTietPhim = (maPhim) => {
        return this.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
    }

    themPhimUpLoadHinh = (formData = new FormData()) => {
        return this.post(`QuanLyPhim/ThemPhimUploadHinh`, formData)
    }

    layThongTinPhimAdmin = (maPhim) => {
        return this.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
    }

    capNhatPhimAdmin = (formData) => {
        return this.post(`QuanLyPhim/CapNhatPhimUpload`, formData)
    }

    xoaPhimAdmin = (maPhim) => {
        return this.delete(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
    }
}

export const quanLyPhimService = new QuanLyPhimService();
