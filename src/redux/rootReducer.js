import { combineReducers } from 'redux'
import ViewerReducer from './Viewer/ViewerReducer'
import CreatorReducer from './Creator/CreatorReducer'
import HomeReducer from './Home/HomeReducer'
import GlobalReducer from './Global/GlobalReducer'

export const rootReducer = combineReducers({
    Viewer: ViewerReducer,
    Home: HomeReducer,
    Creator: CreatorReducer,
    Global: GlobalReducer
})
