
import articleApis from '../../apis/articleApis'
import cloudImageApis from '../../apis/cloudImageApis'
import {
   LOAD_ARTICLES,
   LOAD_ARTICLES_POPULAR,
   ADD_NEW_ARTICLE_LOADING,
   ADD_NEW_ARTICLE_SUCCESS,
   ADD_NEW_ARTICLE_FAIL,
   UPLOAD_FEATURE_IMAGE_SUCCESS
} from '../types'
import { CLOUDINARY_UPLOAD_PRESET } from '../../config/config'
import { attachTokenToHeader } from './authActions'

export const loadArticles = () => async (dispatch) => {
   const response = await articleApis.get('/articles/feed');

   dispatch({ type: LOAD_ARTICLES, payload: response.data });
}
export const loadPopularArticles = () => async (dispatch) => {
   const response = await articleApis.get('/articles/popular');

   dispatch({ type: LOAD_ARTICLES_POPULAR, payload: response.data });
}
export const addNewArticle = (article) => async (dispatch, getState) => {
   dispatch({ type: ADD_NEW_ARTICLE_LOADING });
   try {
      const options = attachTokenToHeader(getState);
      const response = await articleApis.post('/articles', article, options);

      dispatch({ type: ADD_NEW_ARTICLE_SUCCESS, payload: response.data });
   } catch (error) {
      dispatch({ type: ADD_NEW_ARTICLE_FAIL });
   }
}

export const uploadFeatureImage = (file) => async (dispatch) => {

   var formData = new FormData();
   formData.append('file', file);
   formData.append('multiple', true);
   formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

   const response = await cloudImageApis.post('/upload', formData);
   console.log(response);
   dispatch({ type: UPLOAD_FEATURE_IMAGE_SUCCESS, payload: response.data.secure_url });
}