import * as ERR_TYPES from './errorTypes'
import * as TYPES from 'redux/questionTypes'

const questionTypeVerificator = {
    [TYPES.ONE_TRUE]: question => {
        const errors = []

        question.answerOptions.forEach((option, index) => {
            if (!option.id) errors.push(generateError(ERR_TYPES.ERR_QUESTION_ANSWER_OPTION_INVALID_ID, index))
            if (!option.val.trim()) errors.push(generateError(ERR_TYPES.ERR_QUESTION_ANSWER_OPTION_EMPTY, index))
        })

        if (typeof question.answer !== 'number' || !question.answer) errors.push(generateError(ERR_TYPES.ERR_QUESTION_NO_ANSWER))

        return errors
    },
    [TYPES.SEVERAL_TRUE]: question => {
        const errors = []

        question.answerOptions.forEach((option, index) => {
            if (!option.id) errors.push(generateError(ERR_TYPES.ERR_QUESTION_ANSWER_OPTION_INVALID_ID, index))
            if (!option.val.trim()) errors.push(generateError(ERR_TYPES.ERR_QUESTION_ANSWER_OPTION_EMPTY, index))
        })

        if (!Array.isArray(question.answer)) errors.push(generateError(ERR_TYPES.ERR_QUESTION_ANSWER_INVALID_TYPE))
        else if (question.answer.length < 1) errors.push(generateError(ERR_TYPES.ERR_QUESTION_NO_ANSWER))
        else question.answer.forEach((answer, index) => {
            if (!answer) errors.push(generateError(ERR_TYPES.ERR_QUESTION_ANSWER_CHILD_INVALID, index))
        })

        return errors
    },
    [TYPES.WRITE_ANSWER]: question => {
        const errors = []

        if (typeof question.answer !== 'string' || !question.answer.trim()) errors.push(generateError(ERR_TYPES.ERR_QUESTION_ANSWER_EMPTY))

        return errors
    }
}

export const checkQuestions = questions => {
    const errors = []

    questions.forEach((question, index) => {
        const questionErrors = checkQuestion(question)
        if (questionErrors.length > 0) {
            errors.push(generateErrorsList(questionErrors, index))
        }
    })

    return errors
}

export const checkQuestion = question => {
    const errors = []

    if (!question.caption.trim()) errors.push(generateError(ERR_TYPES.ERR_QUESTION_CAPTION_EMPTY))
    if (!TYPES[question.type]) errors.push(generateError(ERR_TYPES.ERR_QUESTION_UNKNOWN_TYPE))
    if (typeof question.config !== 'object') errors.push(generateError(ERR_TYPES.ERR_QUESTION_INVALID_CONFIG_TYPE))

    const verificator = questionTypeVerificator[question.type]
    errors.push(...verificator(question))

    return errors
}

const generateErrorsList = (errors, index) => {
    return { errors, index }
}
const generateError = (error, index) => {
    return Object.assign({ error }, index !== undefined ? { index } : {})
}