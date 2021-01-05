import * as TYPES from './types'
import loadLangDict from 'Localization/Localization'
import * as LangTypes from 'Localization/LangTypes'

export const setLanguage = (langName = '') => {
    return async dispatch => {
        if(!LangTypes[langName]) return
        
        const dictModule = await loadLangDict(langName)

        dispatch({
            type: TYPES.SET_LANGUAGE,
            payload: {
                langName: langName,
                newDictionary: dictModule.default
            }
        })
    }
}