import * as TYPES from './types'

export const createQuestion = () => {
    return {
        type: TYPES.CREATE_QUESTION,
    }
}
export const setSelected = (index) => {
    return {
        type: TYPES.SET_SELECTED,
        payload: index,
    }
}
export const updateQuestion = (changes) => {
    return {
        type: TYPES.UPDATE_QUESTION,
        payload: changes,
    }
}
export const updateAnswers = (answers) => {
    return {
        type: TYPES.UPDATE_ANSWERS,
        payload: answers
    }
}