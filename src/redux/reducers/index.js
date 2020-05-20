import { combineReducers } from 'redux'

import articleListing from './articleListingReducer'
import articleEditor from './articleEditorReducer'
import articleViewer from './articleViewerReducer'
import comments from './commentsReducer'
import register from './registerReducer'
import auth from './authReducer'

export default combineReducers({
   articleListing,
   articleEditor,
   articleViewer,
   comments,
   auth,
   register
})