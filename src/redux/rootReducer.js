import { combineReducers } from 'redux'
import { ViewerReducer } from './Viewer/ViewerReducer'

export const rootReducer = combineReducers({
    Viewer: ViewerReducer
})