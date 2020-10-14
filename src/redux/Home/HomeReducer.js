import * as TYPES from './types'

const initialState = () => ({
    loading: false,
    quizeeList: []
})

const handlers = {
    [TYPES.FETCH_QUIZEES]: state => ({...state, loading: true}),
    [TYPES.SHOW_QUIZEES]: (state, {payload}) => ({...state, loading: false, quizeeList: payload}),
    DEFAULT: state => state
}

export default function (state = initialState(), action = {}) {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
