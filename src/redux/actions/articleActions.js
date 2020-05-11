import articleApis from '../../apis/articleApis'

export const loadArticles = () => async (dispatch) => {
   const response = await articleApis.get('/feed');

   dispatch({ type: "LOAD_ARTICLES", payload: response.data });
}
export const loadPopularArticles = () => async (dispatch) => {
   const response = await articleApis.get('/popular');

   dispatch({ type: "LOAD_ARTICLES_POPULAR", payload: response.data });
}