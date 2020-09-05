import * as TYPES from './types'
import * as QUESTION_TYPES from 'redux/questionTypes'

const initialState = {
    questions: [],
    answers: [],
    caption: 'New Quizee',
    selected: -1,
    thumbnails: [],
}

const questionInitialState = {
    type: QUESTION_TYPES.ONE_TRUE,
    caption: 'Question caption',
    answerOptions: [{id: new Date().getTime(), val: 'Answer'}],
}

const answerInitialState = {
    answer: null,
    config: {},
}

const handlers = {
    [TYPES.CREATE_QUESTION]: (state) => ({
        ...state,
        questions: [...state.questions, JSON.parse(JSON.stringify(questionInitialState))],
        selected: state.questions.length,
        answers: [...state.answers, JSON.parse(JSON.stringify(answerInitialState))],
    }),
    [TYPES.UPDATE_QUESTIONS_LIST]: (state, {payload}) => ({...state, questions: [...payload]}),
    [TYPES.SET_SELECTED]: (state, {payload}) => ({...state, selected: payload}),
    [TYPES.UPDATE_QUESTION]: (state, {payload}) => {
        const questions = [...state.questions]
        questions[state.selected] = payload
        return {
            ...state,
            questions,
        }
    },
    [TYPES.UPDATE_ANSWERS]: (state, {payload}) => ({...state, answers: payload}),
    [TYPES.UPDATE_QUIZEE_CAPTION]: (state, {payload}) => ({...state, caption: payload}),
    DEFAULT: state => state,
}

export const CreatorReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
