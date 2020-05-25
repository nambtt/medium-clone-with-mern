import {
   LOAD_ARTICLES,
   RESET_ARTICLES,
   LOAD_MORE_ARTICLES,
   LOAD_ARTICLES_POPULAR,
   LOAD_MY_ARTICLES,
   DELETE_ARTICLE_SUCCESS
} from '../types'
const initialState = {
   articles: [],
   noMore: false,
   popularArticles: [],
   myArticles: []
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case LOAD_ARTICLES:
         return {
            ...state,
            articles: payload,
            noMore: !payload || !payload.length
         };
      case LOAD_MORE_ARTICLES:
         return {
            ...state,
            articles: [...state.articles, ...payload],
            noMore: !payload || !payload.length
         };
      case RESET_ARTICLES:
         return {
            ...state,
            articles: [],
            noMore: false,
         }
      case LOAD_ARTICLES_POPULAR:
         return {
            ...state,
            popularArticles: payload
         };
      case LOAD_MY_ARTICLES:
         return {
            ...state,
            myArticles: payload
         }
      case DELETE_ARTICLE_SUCCESS:
         const article = state.myArticles.filter(item => item._id === payload);
         if (!article)
            return state;

         return {
            ...state,
            myArticles: state.myArticles.splice(state.myArticles.indexOf(article), 1),
            articles: state.articles.splice(state.articles.indexOf(article), 1),
            popularArticles: state.popularArticles.splice(state.popularArticles.indexOf(article), 1)
         }
      default:
         return state;
   }
}