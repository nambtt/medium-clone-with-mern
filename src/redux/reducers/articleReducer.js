
const initialState = {
   articles: [],
   popularArticles: [],
   article: null
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case 'LOAD_ARTICLES':
         return { ...state, articles: payload };
      case 'LOAD_ARTICLES_POPULAR':
         return { ...state, popularArticles: payload };
      default:
         return state;
   }
}