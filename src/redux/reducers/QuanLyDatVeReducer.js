import { DanhSachPhongVe } from "../../_core/Models/DanhSachPhongVe"

const initialState = {
    danhSachPhongVe: new DanhSachPhongVe(),
    danhSachGheDangDat: [],
    activeTab: 1
}

const QuanLyDatVeReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'SET_DANH_SACH_PHONG_VE': {
            state.danhSachPhongVe = action.danhSachPhongVe
            return { ...state }
        }
        case 'DAT_GHE': {
            let danhSachGheDangDatCapNhat = [...state.danhSachGheDangDat];

            let indexGheDD = danhSachGheDangDatCapNhat.findIndex(gheDD => gheDD.maGhe === action.gheDuocChon.maGhe)
            if (indexGheDD !== -1) {
                danhSachGheDangDatCapNhat.splice(indexGheDD, 1)
            } else {
                danhSachGheDangDatCapNhat.push(action.gheDuocChon)
            }
            state.danhSachGheDangDat = danhSachGheDangDatCapNhat
            return { ...state }
        }
        case 'DAT_VE_HOAN_TAT': {
            state.danhSachGheDangDat = [];
            return { ...state }
        }
        case 'CHUYEN_TAB_KHI_DAT_VE_XONG': {
            state.activeTab = 2
            return { ...state }
        }
        case 'CHUYEN_TAB_ACTIVE': {
            state.activeTab = action.number;
            return { ...state }
        }

        default:
            return state
    }
}
export default QuanLyDatVeReducer
