import {
   LOAD_ARTICLE_DETAILS_SUCCESS
} from '../types'
const initialState = {
   articleDetails: null
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case LOAD_ARTICLE_DETAILS_SUCCESS:
         return { ...state, articleDetails: payload };
      default:
         return state;
   }
}