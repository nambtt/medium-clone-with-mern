import { combineReducers } from 'redux'

import articleListing from './articleListingReducer'
import articleEditor from './articleEditorReducer'
import register from './registerReducer'
import auth from './authReducer'

export default combineReducers({
   articleListing,
   articleEditor,
   auth,
   register
})