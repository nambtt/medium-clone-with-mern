import {
   REGISTER_WITH_EMAIL_LOADING,
   REGISTER_WITH_EMAIL_FAIL,
   REGISTER_WITH_EMAIL_SUCCESS
} from '../type'
import articleApis from '../../apis/articleApis'

export const registerUser = (formData) => async (dispatch, getState) => {
   dispatch({ type: REGISTER_WITH_EMAIL_LOADING });

   try {
      await articleApis.post('/auth/register', formData);
      dispatch({ type: REGISTER_WITH_EMAIL_SUCCESS });
   } catch (error) {
      dispatch({ type: REGISTER_WITH_EMAIL_FAIL, payload: { error: error?.response?.data.message || error.message } });
   }
}