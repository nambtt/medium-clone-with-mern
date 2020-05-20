
import articleApis from '../../apis/articleApis'
import {
   LOAD_COMMENTS,
   LOAD_COMMENTS_SUCCESS,
   ADD_COMMENT,
   ADD_COMMENT_SUCCESS,
   COMPOSING_COMMENT
} from '../types'
import { attachTokenToHeader } from './authActions';

export const setComposingComment = (y) => {
   return { type: COMPOSING_COMMENT };
}

export const loadComments = (articleId) => async (dispatch, getState) => {
   dispatch({ type: LOAD_COMMENTS });
   const options = attachTokenToHeader(getState);

   const response = await articleApis.get(`/articles/${articleId}/comments`, options);

   dispatch({ type: LOAD_COMMENTS_SUCCESS, payload: response.data });
}

export const addComment = (articleId, userId, content) => async (dispatch, getState) => {
   dispatch({ type: ADD_COMMENT });
   const options = attachTokenToHeader(getState);
   const comment = {
      author: userId,
      content
   }
   const response = await articleApis.post(`/articles/${articleId}/comments`, comment, options);
   dispatch({ type: ADD_COMMENT_SUCCESS, payload: response.data });
}