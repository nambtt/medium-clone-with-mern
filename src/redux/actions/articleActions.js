
import articleApis from '../../apis/articleApis'
import {
   LOAD_ARTICLES,
   RESET_ARTICLES,
   LOAD_ARTICLES_POPULAR,
   LOAD_ARTICLE_DETAILS_SUCCESS,
   DELETE_ARTICLE_SUCCESS,
   LOAD_MY_ARTICLES,
   LOAD_MORE_ARTICLES
} from '../types'
import { attachTokenToHeader } from './authActions';

export const loadArticles = (page = 1) => async (dispatch) => {
   const response = await articleApis.get(`/articles/feed?page=${page}`);

   dispatch({ type: page === 1 ? LOAD_ARTICLES : LOAD_MORE_ARTICLES, payload: response.data });
}

export const resetArticles = () => async (dispatch) => {
   dispatch({type: RESET_ARTICLES});
}

export const loadPopularArticles = () => async (dispatch) => {
   const response = await articleApis.get('/articles/popular');

   dispatch({ type: LOAD_ARTICLES_POPULAR, payload: response.data });
}
export const loadArticleDetails = (_id) => async dispatch => {
   const response = await articleApis.get('/articles/' + _id);
   if (response.data) {
      dispatch({ type: LOAD_ARTICLE_DETAILS_SUCCESS, payload: response.data });
   }
}
export const loadMyArticles = (_id) => async (dispatch, getState) => {
   const options = attachTokenToHeader(getState);
   const response = await articleApis.get('/articles/me', options);
   if (response.data) {
      dispatch({ type: LOAD_MY_ARTICLES, payload: response.data });
   }
}
export const deleteArticle = (_id) => async (dispatch, getState) => {
   const options = attachTokenToHeader(getState);
   const response = await articleApis.delete('articles/' + _id, options);
   if (response.data.success) {
      dispatch({ type: DELETE_ARTICLE_SUCCESS, payload: _id });
   }
}