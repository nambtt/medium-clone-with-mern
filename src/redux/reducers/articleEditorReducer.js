import {
   UPLOAD_FEATURE_IMAGE_LOADING,
   UPLOAD_FEATURE_IMAGE_SUCCESS,
   RESET_PUBLISH_STATUS,
   ADD_NEW_ARTICLE_LOADING,
   ADD_NEW_ARTICLE_FAIL,
   ADD_NEW_ARTICLE_SUCCESS,
   CANNOT_PUBLISH_WHILE_UPLOADING_IMAGE
} from '../types'

import { PublishStatus } from '../../constants/enum'

const initialState = {
   featureImageIsUploading: false,
   isErrorPublishingWhileUploadImage: false,
   featureImageUrl: '',
   publishStatus: Object.keys(PublishStatus)[0],
   articleId: ""
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case UPLOAD_FEATURE_IMAGE_LOADING:
         return {
            ...state,
            featureImageIsUploading: true,
            featureImageUrl: '' // remove the existing image when user is uploading one.
         }
      case UPLOAD_FEATURE_IMAGE_SUCCESS:
         return {
            ...state,
            featureImageUrl: payload,
            featureImageIsUploading: false,
            publishStatus: Object.keys(PublishStatus)[0] // publish
         };
      case CANNOT_PUBLISH_WHILE_UPLOADING_IMAGE:
         return {
            ...state,
            isErrorPublishingWhileUploadImage: true,
         }
      case RESET_PUBLISH_STATUS:
         return {
            ...state,
            publishStatus: Object.keys(PublishStatus)[0] // publish
         }
      case ADD_NEW_ARTICLE_LOADING:
         return {
            ...state,
            publishStatus: Object.keys(PublishStatus)[1] // publishing
         }
      case ADD_NEW_ARTICLE_SUCCESS:
         return {
            ...state,
            articleId: payload._id,
            publishStatus: Object.keys(PublishStatus)[2] // published
         }
      case ADD_NEW_ARTICLE_FAIL:
         return {
            ...state,
            publishStatus: Object.keys(PublishStatus)[3] // publish failed
         }
      default:
         return state;
   }
}