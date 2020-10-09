import React, { useState, useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import { TextField, debounce } from '@material-ui/core'
import { updateQuestion } from 'redux/Creator/actions'
import SettingsCard from '../Components/SettingsCard'

const QuestionCaption = ({ question, updateQuestion, dictionary }) => {

    const [caption, setCaption] = useState(question.caption)

    useEffect(() => setCaption(question.caption), [question])

    const dispatchToStore = useCallback(debounce(value => {
        const questionCopy = JSON.parse(JSON.stringify(question))
        questionCopy.caption = value
        updateQuestion(questionCopy)
    }, 300), [question, updateQuestion])


    const captionChangeHandler = value => {
        setCaption(value)
        dispatchToStore(value)
    }

    return (
        <SettingsCard heading={dictionary.QUESTION_CAPTION}>
            <TextField fullWidth
                multiline
                value={caption}
                error={caption <= 0}
                onChange={e => captionChangeHandler(e.target.value)}
            />
        </SettingsCard>
    )
}

const mapStateToProps = state => ({
    question: state.Creator.questions[state.Creator.selected],
    dictionary: state.Global.dictionary.Creator.sections.QuestionSettings
})

const mapDispatchToStore = {
    updateQuestion
}


export default connect(mapStateToProps, mapDispatchToStore)(QuestionCaption)