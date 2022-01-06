import AnswerOptions from './SettingsOptions/AnswerOptions'
import AnswerInput from './SettingsOptions/AnswerInput'
import QuestionCaption from './SettingsOptions/QuestionCaption'
import QuestionType from './SettingsOptions/QuestionType'
import * as TYPES from '../types'

export default {
  [TYPES.QUESTION_CAPTION]: QuestionCaption,
  [TYPES.QUESTION_TYPE]: QuestionType,
  [TYPES.ANSWER_OPTIONS]: AnswerOptions,
  [TYPES.ANSWER_INPUT]: AnswerInput,
}
