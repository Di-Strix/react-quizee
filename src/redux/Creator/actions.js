import * as TYPES from './types'

export const createQuestion = () => ({
  type: TYPES.CREATE_QUESTION,
})
export const setSelected = index => ({
  type: TYPES.SET_SELECTED,
  payload: index,
})
export const updateQuestion = changes => ({
  type: TYPES.UPDATE_QUESTION,
  payload: changes,
})
export const updateQuizeeCaption = caption => ({
  type: TYPES.UPDATE_QUIZEE_CAPTION,
  payload: caption,
})
export const updateQuestionsList = questions => ({
  type: TYPES.UPDATE_QUESTIONS_LIST,
  payload: questions,
})
export const flushCreatorData = () => ({
  type: TYPES.FLUSH_DATA,
})
