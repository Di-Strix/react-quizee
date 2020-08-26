import { combineReducers } from 'redux'
import { ViewerReducer } from './Viewer/ViewerReducer'
import { CreatorReducer } from './Creator/CreatorReducer'
import HomeReducer from './Home/HomeReducer'

export const rootReducer = combineReducers({
    Viewer: ViewerReducer,
    Home: HomeReducer,
    Creator: CreatorReducer,
})
