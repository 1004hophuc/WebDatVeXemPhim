import { SET_CAROUSEL } from "../types/CarouselType"

const initialState = {
    arrImageCarousel: []
}

const CarouselReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CAROUSEL: {
            state.arrImageCarousel = action.arrImageCarousel
            return { ...state }
        }
        default:
            return state
    }
}
export default CarouselReducer;
