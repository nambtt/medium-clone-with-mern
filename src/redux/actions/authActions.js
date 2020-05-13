import authApis from '../../apis/authApis'
import articleApis from '../../apis/articleApis'

import {
   LOGIN_WITH_OAUTH_LOADING,
   LOGIN_WITH_OAUTH_SUCCESS,
   LOGIN_WITH_OAUTH_FAIL,
   LOGOUT_SUCCESS,
   LOGIN_WITH_EMAIL_LOADING,
   LOGIN_WITH_EMAIL_SUCCESS,
   LOGIN_WITH_EMAIL_FAIL,
   ME_LOADING,
   ME_SUCCESS,
   ME_FAIL,
   RESEED_DATABASE_LOADING,
   RESEED_DATABASE_SUCCESS,
   RESEED_DATABASE_FAIL,
} from '../types';

export const loginUserWithEmail = (formData) => async (dispatch, getState) => {
   dispatch({ type: LOGIN_WITH_EMAIL_LOADING });
   try {
      const response = await authApis.post('/login', formData);


      dispatch({
         type: LOGIN_WITH_EMAIL_SUCCESS,
         payload: { token: response.data.token, me: response.data.me }
      })
   } catch (error) {
      dispatch({
         type: LOGIN_WITH_EMAIL_FAIL,
         payload: { error: error.response.data.message },
      })
   }
}

export const logInUserWithOauth = (token) => async (dispatch, getState) => {
   dispatch({ type: LOGIN_WITH_OAUTH_LOADING });

   try {
      const headers = {
         'Content-Type': 'application/json',
         'x-auth-token': token,
      };

      const response = await articleApis.get('/users/me', { headers });

      dispatch({
         type: LOGIN_WITH_OAUTH_SUCCESS,
         payload: { me: response.data.me, token },
      });
   } catch (err) {
      dispatch({
         type: LOGIN_WITH_OAUTH_FAIL,
         payload: { error: err.response.data.message },
      });
   }
};

export const loadMe = () => async (dispatch, getState) => {

   dispatch({ type: ME_LOADING });

   try {
      const options = attachTokenToHeader(getState);
      const response = await articleApis.get('/users/me', options);

      dispatch({ type: ME_SUCCESS, payload: { me: response.data.me } });
   } catch (error) {
      dispatch({
         type: ME_FAIL,
         payload: error.response.data.message
      });
   }
}

export const attachTokenToHeader = (getState) => {
   const token = getState().auth.token;

   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }
   if (token) {
      config.headers['x-auth-token'] = token;
   }
   return config;
}

export const logOut = (history) => async dispatch => {
   try {

      deleteAllCookies();
      await authApis.get('/logout');

      dispatch({
         type: LOGOUT_SUCCESS,
      });

      if (history) history.push('/');
   } catch (error) {
      console.log(error);
   }
}
function deleteAllCookies() {
   var cookies = document.cookie.split(';');

   for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf('=');
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
   }
}