
const initialState = {
   articles: [],
   article: null
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case 'LOAD_ARTICLES':
         return { ...state, articles: payload };
      default:
         return state;
   }
}