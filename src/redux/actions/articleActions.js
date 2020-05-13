import articleApis from '../../apis/articleApis'
import { LOAD_ARTICLES, LOAD_ARTICLES_POPULAR } from '../types'

export const loadArticles = () => async (dispatch) => {
   const response = await articleApis.get('/articles/feed');

   dispatch({ type: LOAD_ARTICLES, payload: response.data });
}
export const loadPopularArticles = () => async (dispatch) => {
   const response = await articleApis.get('/articles/popular');

   dispatch({ type: LOAD_ARTICLES_POPULAR, payload: response.data });
}