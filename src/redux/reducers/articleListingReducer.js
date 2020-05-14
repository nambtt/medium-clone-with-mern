import {
   LOAD_ARTICLES,
   LOAD_ARTICLES_POPULAR,
   ADD_NEW_ARTICLE_LOADING,
   ADD_NEW_ARTICLE_SUCCESS,
   ADD_NEW_ARTICLE_FAIL
} from '../types'
const initialState = {
   articles: [],
   popularArticles: []
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case LOAD_ARTICLES:
         return { ...state, articles: payload };
      case LOAD_ARTICLES_POPULAR:
         return { ...state, popularArticles: payload };
      default:
         return state;
   }
}