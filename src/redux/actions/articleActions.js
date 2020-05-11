import articleApis from '../../apis/articleApis'

export const loadArticles = () => async (dispatch) => {
   const response = await articleApis.get('/articles');

   dispatch({ type: "LOAD_ARTICLES", payload: response.data });
}