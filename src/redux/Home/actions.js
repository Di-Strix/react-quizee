import * as TYPES from './types'

export const fetchQuizees = () => {
    return {
        type: TYPES.FETCH_QUIZEES
    }
}
export const showQuizees = (quizeeList) => {
    return {
        type: TYPES.SHOW_QUIZEES,
        payload: quizeeList
    }
}
export const showError = (message) => {
    return {
        type: TYPES.ERROR,
        payload: message
    }
}