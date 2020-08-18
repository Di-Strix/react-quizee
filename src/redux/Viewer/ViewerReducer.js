import * as TYPES from './types'
import * as SCREENS from './screens'

const getKey = () => new Date().getTime().toString()

const initialState = {
    quizeeId: null,
    questions: [],
    answers: [],
    text: '',
    finished: false,
    screen: '',
    transitionKey: '0',
    Footer: {
        active: false,
    },
    currentScreen: {},
}


const handlers = {
    [TYPES.LOAD_QUESTIONS]: (state, { payload }) => ({ ...state, screen: SCREENS.LOADER, text: 'Loading Quizee...', quizeeId: payload, transitionKey: state.questions.length > 0 ? getKey() : '0' }),
    [TYPES.SAVE_QUESTIONS]: (state, { payload }) => ({ ...state, questions: payload.questions, caption: payload.caption }),
    [TYPES.SHOW_CAPTION]:   (state)              => ({ ...state, screen: SCREENS.CAPTION, transitionKey: getKey() }),
    [TYPES.SHOW_QUESTIONS]: (state)              => ({ ...state, screen: SCREENS.QUEST, transitionKey: getKey() }),
    [TYPES.LOAD_RESULTS]:   (state)              => ({ ...state, screen: SCREENS.LOADER, text: 'Please wait, we are processing your answers🎉', transitionKey: getKey(), finished: true }),
    [TYPES.SHOW_RESULTS]:   (state, { payload }) => ({ ...state, screen: SCREENS.END_TITLE, text: `Woohoo! You've ${payload}% correct answers!`, transitionKey: getKey() }),
    [TYPES.ADD_ANSWER]:     (state, { payload }) => ({ ...state, answers: [...state.answers, payload], transitionKey: getKey(), currentScreen: {} }),
    [TYPES.SET_QUIZEE_ID]:  (state, { payload }) => ({ ...state, quizeeId: payload }),
    [TYPES.ERROR]:          (state, { payload }) => ({ ...state, screen: SCREENS.ERROR, text: payload, transitionKey: getKey() }),

    [TYPES.FOOTER_DISABLE_NEXT_BUTTON]: (state)              => ({ ...state, Footer: {active: false} }),
    [TYPES.FOOTER_ENABLE_NEXT_BUTTON]:  (state)              => ({ ...state, Footer: {active: true } }),
    DEFAULT: state => state
}

export const ViewerReducer = (state = initialState, action = {}) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}