import {
   LOAD_COMMENTS,
   LOAD_COMMENTS_SUCCESS,
   ADD_COMMENT,
   ADD_COMMENT_SUCCESS
} from '../types'
const initialState = {
   loading: false,
   article: null,
   isCommenting: false,
   comment: "",
   publishedComment: false,
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case LOAD_COMMENTS:
      case ADD_COMMENT:
         return { ...state, loading: true };
      case LOAD_COMMENTS_SUCCESS:
         return { ...state, loading: false, article: payload.article };
      case ADD_COMMENT_SUCCESS:

         return {
            ...state, loading: false,
            publishedComment: true,
            article: {
               ...state.article,
               comments: [payload, ...state.article.comments]
            }
         };
      default:
         return state;
   }
}