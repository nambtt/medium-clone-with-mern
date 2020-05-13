import { combineReducers } from 'redux'

import article from './articleReducer'
import register from './registerReducer'
import auth from './authReducer'

export default combineReducers({
   article,
   auth,
   register
})