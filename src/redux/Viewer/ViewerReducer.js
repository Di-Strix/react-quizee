import * as TYPES from './types'
import * as SCREENS from './screens'

const getKey = () => new Date().getTime().toString()

const initialState = {
    quizeeId: '',
    questions: [],
    answers: [],
    text: '',
    finished: false,
    screen: SCREENS.CAPTION,
    transitionKey: '0',
    Footer: {
        active: false
    },
    currentScreen: ''
}


const handlers = {
    [TYPES.SET_SCREEN]: (state, {payload}) => ({
        ...state,
        screen: payload || SCREENS.CAPTION,
        loading: false
    }),
    [TYPES.SET_LOADING]: (state, {payload}) => ({...state, loading: payload}),
    [TYPES.SET_TEXT]: (state, {payload}) => ({...state, text: payload}),
    [TYPES.SAVE_QUESTIONS]:
        (state, {payload}) => ({...state, questions: payload.questions, caption: payload.caption}),
    [TYPES.LOAD_RESULTS]:
        (state) => ({
            ...state,
            screen: SCREENS.LOADER,
            text: 'Please wait, we are processing your answers🎉',
            finished: true,
            Footer: {active: false}
        }),
    [TYPES.SHOW_RESULTS]:
        (state, {payload}) => ({
            ...state,
            screen: SCREENS.END_TITLE,
            text: `Woohoo! You've ${payload}% correct answers!`
        }),
    [TYPES.ADD_ANSWER]:
        (state, {payload}) => ({
            ...state,
            answers: [...state.answers, payload]
        }),
    [TYPES.SET_QUIZEE_ID]:
        (_, {payload}) => ({...initialState, quizeeId: payload}),
    [TYPES.ERROR]:
        (state, {payload}) => ({...state, screen: SCREENS.ERROR, text: payload}),
    [TYPES.FOOTER_SET_NEXT_BUTTON_STATE]:
        (state, {payload}) => ({...state, Footer: {active: payload}}),
    [TYPES.UPDATE_TRANSITION_KEY]:
        (state) => ({...state, transitionKey: getKey()}),
    DEFAULT: state => state
}

export const ViewerReducer = (state = initialState, action = {}) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
