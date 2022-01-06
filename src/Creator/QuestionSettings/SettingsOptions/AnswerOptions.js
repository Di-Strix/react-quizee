import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as TYPES from 'redux/questionTypes'
import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Checkbox,
  ListItemIcon,
  Radio,
  debounce,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { updateQuestion } from 'redux/Creator/actions'
import DeleteIcon from '@mui/icons-material/Delete'
import SettingsCard from '../Components/SettingsCard'
import * as ERR_TYPES from 'Creator/errorTypes'

const acceptableErrors = [
  ERR_TYPES.ERR_QUESTION_ANSWER_OPTION_INVALID_ID,
  ERR_TYPES.ERR_QUESTION_ANSWER_OPTION_EMPTY,
  ERR_TYPES.ERR_QUESTION_NO_ANSWER,
  ERR_TYPES.ERR_QUESTION_ANSWER_CHILD_INVALID_ID,
]

const AnswerOptions = ({ question, updateQuestion, dictionary, errorsDictionary }) => {
  const [answerOptions, setAnswerOptions] = useState(question.answerOptions)

  useEffect(() => setAnswerOptions(question.answerOptions), [question])

  const generateNewQuestionObject = useCallback(
    (id, newCaption) => {
      const questionCopy = JSON.parse(JSON.stringify(question))
      const index = questionCopy.answerOptions.findIndex(value => value.id === id)
      if (index < 0) return
      questionCopy.answerOptions[index] = { ...questionCopy.answerOptions[index], val: newCaption }
      return questionCopy
    },
    [question]
  )

  const dispatchToStore = useCallback(
    debounce(newQuestion => {
      updateQuestion(newQuestion)
    }, 300),
    [updateQuestion]
  )

  const answerOptionChangeHandler = useCallback(
    (id, newCaption) => {
      const newQuestion = generateNewQuestionObject(id, newCaption.trimStart())
      setAnswerOptions(newQuestion.answerOptions)
      dispatchToStore(newQuestion)
    },
    [setAnswerOptions, dispatchToStore, generateNewQuestionObject]
  )

  const deleteHandler = id => {
    if (question.answerOptions.length <= 1) return

    const questionCopy = JSON.parse(JSON.stringify(question))

    questionCopy.answerOptions = questionCopy.answerOptions.filter(answer => answer.id !== id)

    if (question.type === TYPES.SEVERAL_TRUE) {
      questionCopy.answer = questionCopy.answer.filter(val => val !== id)
    } else if (question.answer === id) {
      questionCopy.answer = null
      questionCopy.config = {}
    }

    updateQuestion(questionCopy)
    setAnswerOptions(questionCopy.answerOptions)
  }

  const addHandler = () => {
    const questionCopy = JSON.parse(JSON.stringify(question))
    questionCopy.answerOptions.push({ id: new Date().getTime(), val: 'Answer' })
    updateQuestion(questionCopy)
    setAnswerOptions(questionCopy.answerOptions)
  }

  const radioHandler = id => {
    const questionCopy = JSON.parse(JSON.stringify(question))
    questionCopy.answer = id
    updateQuestion(questionCopy)
  }

  const checkBoxHandler = id => {
    const questionCopy = JSON.parse(JSON.stringify(question))
    if (questionCopy.answer.includes(id)) {
      questionCopy.answer = questionCopy.answer.filter(val => val !== id)
    } else {
      questionCopy.answer.push(id)
    }
    updateQuestion(questionCopy)
  }

  let ListAction
  if (question.type === TYPES.ONE_TRUE) {
    ListAction = id => <Radio checked={question.answer === id} onChange={() => radioHandler(id)} />
  } else {
    ListAction = id => <Checkbox checked={question.answer.includes(id)} onChange={() => checkBoxHandler(id)} />
  }

  return (
    <SettingsCard
      heading={dictionary.SECTION_HEADING}
      acceptableErrors={acceptableErrors}
      AdditionalAction={
        <IconButton onClick={addHandler}>
          <AddIcon />
        </IconButton>
      }
    >
      <List>
        {answerOptions.map(answer => (
          <ListItem key={answer.id} style={{ paddingLeft: 0 }}>
            <ListItemIcon style={{ minWidth: 0 }}>{ListAction(answer.id)}</ListItemIcon>
            <ListItemText
              primary={
                <TextField
                  fullWidth
                  value={answer.val}
                  error={answer.val.length <= 0}
                  multiline
                  onChange={e => answerOptionChangeHandler(answer.id, e.target.value)}
                  variant='standard'
                />
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge='end'
                onClick={() => deleteHandler(answer.id)}
                disabled={question.answerOptions.length <= 1}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </SettingsCard>
  )
}

const mapStateToProps = state => ({
  question: state.Creator.questions[state.Creator.selected],
  state: state.Creator,
  dictionary:
    state.Global.dictionary.Creator.sections.QuestionSettings.questionTypes[
      state.Creator.questions[state.Creator.selected].type
    ],
})
const mapDispatchToProps = {
  updateQuestion,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerOptions)
