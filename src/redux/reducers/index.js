import { combineReducers } from 'redux'

import articleReducer from './articleReducer'
import registerReducer from './registerReducer'
import authReducer from './authReducer'

export default combineReducers({
   articleReducer,
   authReducer,
   registerReducer
})