import {
   REGISTER_WITH_EMAIL_LOADING,
   REGISTER_WITH_EMAIL_SUCCESS,
   REGISTER_WITH_EMAIL_FAIL,
} from '../type'

const initialState = {
   isLoading: false,
   error: null
}
export default (state = initialState, { type, payload }) => {
   switch (type) {
      case REGISTER_WITH_EMAIL_LOADING:
         return {
            ...state,
            isLoading: true
         }
      case REGISTER_WITH_EMAIL_SUCCESS:
         return {
            ...state,
            isLoading: false,
            error: null
         };
      case REGISTER_WITH_EMAIL_FAIL:
         return {
            ...state,
            isLoading: false,
            error: payload.error
         };
      default: return state;
   }
}
