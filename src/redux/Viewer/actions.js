import {
    ADD_ANSWER,
    ERROR,
    SHOW_RESULTS,
    LOAD_RESULTS,
    SAVE_QUESTIONS,
    LOAD_QUESTIONS,
    SET_QUIZEE_ID,
    UPDATE_TRANSITION_KEY,
    SET_SCREEN,
    SET_TEXT,
    SET_LOADING,
    FOOTER_SET_NEXT_BUTTON_STATE
} from './types'
import { CAPTION, QUEST } from './screens'

export const addAnswer = (answer) => {
    return {
        type: ADD_ANSWER,
        payload: answer
    }
}
export const setQuizeeID = (ID) => {
    return {
        type: SET_QUIZEE_ID,
        payload: ID
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
        type: LOAD_RESULTS
    }
}
export const showQuestionsScreen = () => {
    return {
        type: SET_SCREEN,
        payload: QUEST
    }
}
export const showCaptionScreen = () => {
    return {
        type: SET_SCREEN,
        payload: CAPTION
    }
}
export const setText = text => {
    return {
        type: SET_TEXT,
        payload: text || ''
    }
}
export const setLoading = state => {
    return {
        type: SET_LOADING,
        payload: state
    }
}
export const saveQuestions = (questions) => {
    return {
        type: SAVE_QUESTIONS,
        payload: {
            questions: questions || []
        }
    }
}
export const loadQuestions = () => {
    return {
        type: LOAD_QUESTIONS
    }
}

export const setFooterButtonState = state => {
    return {
        type: FOOTER_SET_NEXT_BUTTON_STATE,
        payload: state
    }
}
export const updateTransitionKey = () => {
    return {
        type: UPDATE_TRANSITION_KEY
    }
}
