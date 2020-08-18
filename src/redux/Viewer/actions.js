import {
    ADD_ANSWER,
    ERROR,
    SHOW_RESULTS,
    LOAD_RESULTS,
    SHOW_QUESTIONS,
    SHOW_CAPTION,
    SAVE_QUESTIONS,
    LOAD_QUESTIONS,
    FOOTER_DISABLE_NEXT_BUTTON,
    FOOTER_ENABLE_NEXT_BUTTON,
} from './types'

export const addAnswer = (answer) => {
    return {
        type: ADD_ANSWER,
        payload: answer
    }
}
export const throwError = (message) => {
    return {
        type: ERROR,
        payload: message
    }
}
export const showResults = (message) => {
    return {
        type: SHOW_RESULTS,
        payload: message
    }
}
export const loadResults = () => {
    return {
        type: LOAD_RESULTS,
    }
}
export const showQuestions = () => {
    return {
        type: SHOW_QUESTIONS,
    }
}
export const showCaption = () => {
    return {
        type: SHOW_CAPTION,
    }
}
export const saveQuestions = (caption, questions) => {
    return {
        type: SAVE_QUESTIONS,
        payload: {
            questions: questions || [],
            caption: caption || {}
        }
    }
}
export const loadQuestions = (quizeeId) => {
    return {
        type: LOAD_QUESTIONS,
        payload: quizeeId || ''
    }
}

export const setFooterButtonState = state => {
    if (state)
        return { type: FOOTER_ENABLE_NEXT_BUTTON }
    return { type: FOOTER_DISABLE_NEXT_BUTTON }
}