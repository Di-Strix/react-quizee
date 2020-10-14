import * as TYPES from './types'
import langList from 'Localization/Localization'

export const setLanguage = (langName = '') => {
    return async dispatch => {
        if(!langList[langName.toUpperCase()]) return
        
        const dictModule = await langList[langName.toUpperCase()]()
        dispatch({
            type: TYPES.SET_LANGUAGE,
            payload: {
                langName: langName.toUpperCase(),
                newDictionary: dictModule.default
            }
        })
    }
}