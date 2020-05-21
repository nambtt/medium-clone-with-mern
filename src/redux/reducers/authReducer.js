const Types = require('../types')

const initialState = {
   token: localStorage.getItem('token'),
   isAuthenticated: false,
   currentPageNeedAuthorization: false,
   me: null,
   appLoaded: false,
   isLoading: false,
   error: null
}

export default (state = initialState, { type, payload }) => {

   switch (type) {
      case Types.NEED_AUTHORIZATION:
         console.log(type, payload)
         return {
            ...state,
            currentPageNeedAuthorization: payload,
         }
      case Types.ME_LOADING:
         return {
            ...state,
            isLoading: true,
            appLoaded: false,
            error: null
         };
      case Types.ME_SUCCESS:
         return {
            ...state,
            isAuthenticated: true,
            isLoading: false,
            me: payload.me,
            error: null,
            appLoaded: true,
         };
      case Types.ME_FAIL:
         localStorage.removeItem('token');
         return {
            ...state,
            isAuthenticated: false,
            isLoading: false,
            me: null,
            error: null,
            appLoaded: true,
         };
      case Types.LOGIN_WITH_EMAIL_LOADING:
         return {
            ...state,
            isLoading: true
         }
      case Types.LOGIN_WITH_EMAIL_SUCCESS:
      case Types.LOGIN_WITH_OAUTH_SUCCESS:
         localStorage.setItem('token', payload.token);
         return {
            ...state,
            isAuthenticated: true,
            isLoading: false,
            token: payload.token,
            me: payload.me,
            error: null,
            appLoaded: true
         }
      case Types.LOGIN_WITH_EMAIL_FAIL:
         return {
            ...state,
            error: payload
         };
      case Types.LOGOUT_SUCCESS:
         localStorage.removeItem('token');
         return {
            ...state,
            isAuthenticated: false,
            isLoading: false,
            token: null,
            me: null,
            error: null,
            appLoaded: false
         }
      default: return state;
   }

}