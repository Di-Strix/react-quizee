import { useContext } from 'react'
import VerificationContext from 'Creator/Context/VerificationContext'

export const useErrorsFromQuestion = acceptableErrorsList =>
  useContext(VerificationContext).currentQuestionErrors.filter(errObj => acceptableErrorsList.includes(errObj.error))
