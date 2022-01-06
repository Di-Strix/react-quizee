import * as TYPES from './types'

const initialState = () => ({
  lang: '',
  dictionary: {},
})

const handlers = {
  [TYPES.SET_LANGUAGE]: (state, { newDictionary, langName }) => ({
    ...state,
    dictionary: newDictionary,
    lang: langName,
  }),
  DEFAULT: state => state,
}

export default (state = initialState(), action = {}) => {
  const handle = handlers[action.type] || handlers.DEFAULT
  return handle(state, action.payload)
}
