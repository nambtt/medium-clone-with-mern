import {
   LOAD_ARTICLES,
   RESET_ARTICLES,
   LOAD_MORE_ARTICLES,
   LOAD_ARTICLES_POPULAR,
   LOAD_MY_ARTICLES,
   DELETE_ARTICLE_SUCCESS,
   LOGOUT_SUCCESS,
   ARTICLE_CLAP_SUCCESS
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

      case ARTICLE_CLAP_SUCCESS:
         const feedArticles = updateArticleClap(state.articles, payload);
         const popularArticles = updateArticleClap(state.articles, payload);
         if (!feedArticles)
            return state;
         return {
            ...state,
            articles: feedArticles,
            popularArticles: popularArticles
         }
      case DELETE_ARTICLE_SUCCESS:
         let articles = state.myArticles.filter(item => item._id === payload);
         if (!articles.length)
            return state;
         const index = state.myArticles.indexOf(articles[0]);
         console.log("index", index, payload)
         return {
            ...state,
            myArticles: [
               ...state.myArticles.slice(0, index),
               ...state.myArticles.slice(index + 1)
            ]
         }
      case LOGOUT_SUCCESS:
         return {
            ...state,
            myArticles: []
         }
      default:
         return state;
   }
}

function updateArticleClap(list, payload) {
   const updatedList = [...list];
   let articles = updatedList.filter(article => article._id === payload._id);
   if (!articles.length)
      return null;
   articles[0].clap = payload.clap;

   return updatedList;
}