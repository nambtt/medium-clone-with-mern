import {
   LOAD_COMMENTS,
   LOAD_COMMENTS_SUCCESS,
   COMPOSING_COMMENT,
   ADD_COMMENT,
   ADD_COMMENT_SUCCESS
} from '../types'
const initialState = {
   loading: false,
   article: null,
   composingComment: false,
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case COMPOSING_COMMENT:
         return {
            ...state,
            composingComment: true
         }
      case LOAD_COMMENTS:
      case ADD_COMMENT:
         return { ...state, loading: true };
      case LOAD_COMMENTS_SUCCESS:
         return { ...state, loading: false, article: payload.article };
      case ADD_COMMENT_SUCCESS:

         const newCmtList = [payload, ...state.article.comments];
         return {
            ...state, loading: false,
            composingComment: false,
            article: {
               ...state.article,
               comments: newCmtList,
               noOfComments: newCmtList.length
            }
         };
      default:
         return state;
   }
}