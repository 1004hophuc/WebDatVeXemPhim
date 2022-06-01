import { SET_DANH_SACH_PHIM } from "../types/QuanLyPhimType"

const initialState = {
    arrPhim: [],
    arrDefault: [],
    dangChieu: true,
    sapChieu: true,
    phimDetail: {},
    thongTinPhimAdmin: {}
}

const QuanLyPhimReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DANH_SACH_PHIM: {
            state.arrPhim = action.arrPhim;
            state.arrDefault = action.arrPhim
            return { ...state }
        }

        case 'SET_PHIM_DANG_CHIEU': {
            state.dangChieu = !state.dangChieu
            state.arrPhim = state.arrDefault.filter(phim => phim.dangChieu === state.dangChieu)
            return { ...state }
        }

        case 'SET_PHIM_SAP_CHIEU': {
            state.sapChieu = !state.sapChieu
            state.arrPhim = state.arrDefault.filter(phim => phim.sapChieu === state.sapChieu)
            return { ...state }
        }
        case 'SET_THONG_TIN_CHI_TIET_PHIM': {
            state.phimDetail = action.phimDetail
            return { ...state }
        }
        case 'SET_THONG_TIN_PHIM_ADMIN': {
            state.thongTinPhimAdmin = action.thongTinPhimAdmin
            return { ...state }
        }

        default:
            return state
    }
}
export default QuanLyPhimReducer;