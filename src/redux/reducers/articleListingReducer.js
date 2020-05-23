import {
   LOAD_ARTICLES,
   LOAD_ARTICLES_POPULAR
} from '../types'
const initialState = {
   articles: [],
   noMore: false,
   popularArticles: []
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case LOAD_ARTICLES:
         return { 
            ...state, 
            articles: [...state.articles, ...payload],
            noMore: !payload || !payload.length
         };
      case LOAD_ARTICLES_POPULAR:
         return {
            ...state,
            popularArticles: payload
         };
      default:
         return state;
   }
}