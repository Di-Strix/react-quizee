import * as TYPES from './types'
import EN_DICT from 'Localization/Languages/En'

const initialState = {
    lang: 'EN',
    dictionary: EN_DICT
}

const handlers = {
    [TYPES.SET_LANGUAGE]: (state, { newDictionary, langName }) => ({ ...state, dictionary: newDictionary, lang: langName }),
    DEFAULT: state => state
}

export default (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action.payload)
}