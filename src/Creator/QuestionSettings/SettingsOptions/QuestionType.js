import React from 'react'
import { connect } from 'react-redux'
import { Select, MenuItem } from '@material-ui/core'
import * as TYPES from 'redux/questionTypes'
import { updateQuestion, updateAnswers } from 'redux/Creator/actions'
import SettingsCard from '../Components/SettingsCard'

const QuestionType = ({ updateQuestion, updateAnswers, state, question }) => {

    const typeChangeHandler = ({ target }) => {
        const questionCopy = JSON.parse(JSON.stringify(question))
        const stateAnswersCopy = JSON.parse(JSON.stringify(state.answers))
        questionCopy.type = TYPES[target.value] || TYPES.ONE_TRUE
        updateQuestion(questionCopy)

        if (target.value === TYPES.SEVERAL_TRUE) {
            stateAnswersCopy[state.selected].answer = []
        } else {
            stateAnswersCopy[state.selected].answer = null
        }
        updateAnswers(stateAnswersCopy)
    }


    return (
        <SettingsCard heading={'Question type'}>
            <Select value={question.type} onChange={typeChangeHandler} style={{ width: '100%' }}>
                <MenuItem value={TYPES.ONE_TRUE}>One true</MenuItem>
                <MenuItem value={TYPES.SEVERAL_TRUE}>Several true</MenuItem>
                <MenuItem value={TYPES.WRITE_ANSWER}>Write answer</MenuItem>
            </Select>
        </SettingsCard>

    )
}

const mapStateToProps = state => ({
    question: state.Creator.questions[state.Creator.selected],
    state: state.Creator
})
const mapDispatchToProps = {
    updateQuestion,
    updateAnswers
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionType)