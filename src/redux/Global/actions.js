import * as TYPES from './types'
import langList from 'Localization/Localization'

export const setLanguage = langName => {
    return async dispatch => {
        const dict = await langList[langName]()
        dispatch({
            type: TYPES.SET_LANGUAGE,
            payload: {
                langName: langName,
                newDictionary: dict
            }
        })
    }
}