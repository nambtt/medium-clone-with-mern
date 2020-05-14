import { combineReducers } from 'redux'

import articleListing from './articleListingReducer'
import article from './articleReducer'
import register from './registerReducer'
import auth from './authReducer'

export default combineReducers({
   articleListing,
   article,
   auth,
   register
})