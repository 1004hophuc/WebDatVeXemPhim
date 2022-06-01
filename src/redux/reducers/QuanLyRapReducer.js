import { SET_DANH_SACH_HE_THONG_RAP, SET_THONG_TIN_LICH_CHIEU_PHIM } from "../types/QuanLyRapType"

const initialState = {
    arrHeThongRap: [],
    lichChieuPhim: {}
}

const QuanLyRapReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_DANH_SACH_HE_THONG_RAP: {
            state.arrHeThongRap = action.arrHeThongRap
            return { ...state }
        }

        case SET_THONG_TIN_LICH_CHIEU_PHIM: {
            state.lichChieuPhim = action.lichChieuPhim
            return { ...state }
        }

        default:
            return state
    }
}
export default QuanLyRapReducer
