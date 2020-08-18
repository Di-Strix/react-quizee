import * as TYPES from '../redux/Viewer/types'
import * as SCREENS from './screens'

const handlers = {
    [TYPES.LOAD_QUESTIONS]:  (state, { payload }) => ({ ...state, screen: SCREENS.LOADER, text: 'Loading Quizee...', quizeeId: payload }),
    [TYPES.SAVE_QUESTIONS]:  (state, { payload }) => ({ ...state, questions: payload.questions, caption: payload.caption}),
    [TYPES.SHOW_CAPTION]:    (state)              => ({ ...state, screen: SCREENS.CAPTION}),
    [TYPES.SHOW_QUESTIONS]:  (state)              => ({ ...state, screen: SCREENS.QUEST}),
    [TYPES.LOAD_RESULTS]:    (state)              => ({ ...state, screen: SCREENS.LOADER, text: 'Please wait, we are processing your answers🎉' }),
    [TYPES.SHOW_RESULTS]:    (state, { payload }) => ({ ...state, screen: SCREENS.END_TITLE, text: `Woohoo! You've ${payload}% correct answers!` }),
    [TYPES.ADD_ANSWER]:      (state, { payload }) => ({ ...state, answers: [...state.answers, payload] }),
    [TYPES.SET_QUIZEE_ID]:   (state, { payload }) => ({ ...state, quizeeId: payload }),
    [TYPES.ERROR]:           (state, { payload }) => ({ ...state, screen: SCREENS.ERROR, text: payload}),
    DEFAULT: state => state
}

export const ViewerReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}