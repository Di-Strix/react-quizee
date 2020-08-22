import { combineReducers } from 'redux'
import { ViewerReducer } from './Viewer/ViewerReducer'
import HomeReducer from './Home/HomeReducer'

export const rootReducer = combineReducers({
    Viewer: ViewerReducer,
    Home: HomeReducer,
})