import {
   ADD_NEW_ARTICLE_LOADING,
   ADD_NEW_ARTICLE_SUCCESS,
   ADD_NEW_ARTICLE_FAIL,
   UPLOAD_FEATURE_IMAGE_SUCCESS
} from '../types'
const initialState = {
   featureImageUrl: ''
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case UPLOAD_FEATURE_IMAGE_SUCCESS:
         return {
            ...state,
            featureImageUrl: payload
         };
      default:
         return state;
   }
}