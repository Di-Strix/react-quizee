import React, { useCallback, useEffect, useState } from 'react'
import {
    List,
    ListItem,
    ListItemText,
    TextField,
    ListItemIcon,
    Checkbox,
    debounce
} from '@mui/material'
import { connect } from 'react-redux'
import { updateQuestion } from 'redux/Creator/actions'
import SettingsCard from '../Components/SettingsCard'
import * as ERR_TYPES from 'Creator/errorTypes'

const configKeys = ['equalCase']
const acceptableErrors = [ERR_TYPES.ERR_QUESTION_ANSWER_EMPTY]

const AnswerInput = ({ updateQuestion, question, state, dictionary }) => {
  const [inputValue, setInputValue] = useState(question.answer)

  useEffect(() => setInputValue(question.answer), [question.answer])

  const dispatchToStore = useCallback(
    debounce(value => {
      const questionCopy = JSON.parse(JSON.stringify(question))
      questionCopy.answer = value
      updateQuestion(questionCopy)
    }, 300),
    [state, updateQuestion]
  )

  const answerChangeHandler = value => {
    setInputValue(value.trimStart())
    dispatchToStore(value.trimStart())
  }

  const configChangeHandler = key => {
    const questionCopy = JSON.parse(JSON.stringify(question))
    questionCopy.config[key] = !questionCopy.config[key]
    updateQuestion(questionCopy)
  }

  return (
    <SettingsCard heading={dictionary.SECTION_HEADING} acceptableErrors={acceptableErrors}>
      <TextField
        fullWidth
        value={inputValue || ''}
        error={!Boolean(inputValue && inputValue.length >= 0)}
        onChange={e => answerChangeHandler(e.target.value)}
      />
      <List style={{ paddingBottom: 0 }}>
        {configKeys.map(key => (
          <ListItem key={key}>
            <ListItemIcon style={{ minWidth: 0 }}>
              <Checkbox
                edge='start'
                onChange={() => configChangeHandler(key)}
                checked={question.config[key] || false}
              />
            </ListItemIcon>
            <ListItemText primary={'Must equal case'} />
          </ListItem>
        ))}
      </List>
    </SettingsCard>
  )
}

const mapStateToProps = state => ({
  state: state.Creator,
  question: state.Creator.questions[state.Creator.selected],
  dictionary:
    state.Global.dictionary.Creator.sections.QuestionSettings.questionTypes[
      state.Creator.questions[state.Creator.selected].type
    ],
})
const mapDispatchToProps = {
  updateQuestion,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerInput)
