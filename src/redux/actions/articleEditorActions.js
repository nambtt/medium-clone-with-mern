
import articleApis from '../../apis/articleApis'
import cloudImageApis from '../../apis/cloudImageApis'
import {
   RESET_PUBLISH_STATUS,
   ADD_NEW_ARTICLE_LOADING,
   ADD_NEW_ARTICLE_SUCCESS,
   ADD_NEW_ARTICLE_FAIL,
   UPLOAD_FEATURE_IMAGE_LOADING,
   UPLOAD_FEATURE_IMAGE_SUCCESS,
   CANNOT_PUBLISH_WHILE_UPLOADING_IMAGE,
   EDIT_ARTICLE
} from '../types'

import { CLOUDINARY_UPLOAD_PRESET } from '../../config/config'
import { attachTokenToHeader } from './authActions'



export const uploadFeatureImage = (file) => async (dispatch) => {

   dispatch({ type: UPLOAD_FEATURE_IMAGE_LOADING });

   var formData = new FormData();
   formData.append('file', file);
   formData.append('multiple', true);
   formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

   const response = await cloudImageApis.post('/upload', formData);
   dispatch({ type: UPLOAD_FEATURE_IMAGE_SUCCESS, payload: response.data.secure_url });
}

export const publishArticle = (article) => async (dispatch, getState) => {
   if (getState().articleEditor.featureImageIsUploading) {
      dispatch({ type: CANNOT_PUBLISH_WHILE_UPLOADING_IMAGE });
      return;
   }

   dispatch({ type: ADD_NEW_ARTICLE_LOADING });
   try {
      const options = attachTokenToHeader(getState);
      const response = article._id ?
         await articleApis.put('/articles', article, options) :
         await articleApis.post('/articles', article, options);

      dispatch({ type: ADD_NEW_ARTICLE_SUCCESS, payload: response.data });
   } catch (error) {
      dispatch({ type: ADD_NEW_ARTICLE_FAIL });
   }
}

export const resetPublishStatue = () => async dispatch => {
   dispatch({ type: RESET_PUBLISH_STATUS });
}
export const loadArticleForEditing = (_id) => async (dispatch, getState) => {
   const options = attachTokenToHeader(getState);
   const response = await articleApis.get('/articles/' + _id, options);
   if (response.data) {
      dispatch({ type: EDIT_ARTICLE, payload: response.data });
   }
}