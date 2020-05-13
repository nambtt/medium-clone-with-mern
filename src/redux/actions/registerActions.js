import {
   REGISTER_WITH_EMAIL_LOADING,
   REGISTER_WITH_EMAIL_FAIL,
   REGISTER_WITH_EMAIL_SUCCESS,
   LOGIN_WITH_EMAIL_SUCCESS
} from '../types'
import authApis from '../../apis/authApis'

export const registerUser = (formData) => async (dispatch, getState) => {
   dispatch({ type: REGISTER_WITH_EMAIL_LOADING });

   try {
      const response = await authApis.post('/register', formData);
      dispatch({ type: REGISTER_WITH_EMAIL_SUCCESS });
      dispatch({
         type: LOGIN_WITH_EMAIL_SUCCESS,
         payload: { token: response.data.token, me: response.data.me }
      })
   } catch (error) {
      dispatch({ type: REGISTER_WITH_EMAIL_FAIL, payload: { error: error?.response?.data.message || error.message } });
   }
}