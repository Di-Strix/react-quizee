import React from 'react'
import { connect } from 'react-redux'
import { Select, MenuItem } from '@material-ui/core'
import * as TYPES from 'redux/questionTypes'
import { updateQuestion } from 'redux/Creator/actions'
import SettingsCard from '../Components/SettingsCard'
import * as ERR_TYPE from 'Creator/errorTypes'

const acceptableErrors = [
    ERR_TYPE.ERR_QUESTION_UNKNOWN_TYPE,
    ERR_TYPE.ERR_QUESTION_INVALID_CONFIG_TYPE,
    ERR_TYPE.ERR_QUESTION_ANSWER_INVALID_TYPE
]

const QuestionType = ({ updateQuestion, question, dictionary }) => {

    const typeChangeHandler = ({ target }) => {
        const questionCopy = JSON.parse(JSON.stringify(question))

        questionCopy.type = TYPES[target.value] || TYPES.ONE_TRUE

        if (target.value === TYPES.SEVERAL_TRUE) questionCopy.answer = []
        else if (target.value === TYPES.WRITE_ANSWER) questionCopy.answer = ''
        else questionCopy.answer = null

        updateQuestion(questionCopy)
    }


    return (
        <SettingsCard
            heading={dictionary.QUESTION_TYPE}
            acceptableErrors={acceptableErrors}
        >
            <Select value={question.type} onChange={typeChangeHandler} style={{ width: '100%' }}>
                <MenuItem value={TYPES.ONE_TRUE}>{dictionary.questionTypes[TYPES.ONE_TRUE].TYPE_NAME}</MenuItem>
                <MenuItem value={TYPES.SEVERAL_TRUE}>{dictionary.questionTypes[TYPES.SEVERAL_TRUE].TYPE_NAME}</MenuItem>
                <MenuItem value={TYPES.WRITE_ANSWER}>{dictionary.questionTypes[TYPES.WRITE_ANSWER].TYPE_NAME}</MenuItem>
            </Select>
        </SettingsCard>

    )
}

const mapStateToProps = state => ({
    question: state.Creator.questions[state.Creator.selected],
    state: state.Creator,
    dictionary: state.Global.dictionary.Creator.sections.QuestionSettings
})
const mapDispatchToProps = {
    updateQuestion,
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionType)