import React, { useState, useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import {
    Grid,
    Typography,
    Paper,
    TextField,
    debounce
} from '@material-ui/core'
import { updateQuestion } from 'redux/Creator/actions'

const QuestionCaption = ({ classes, question, updateQuestion }) => {

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
        <Grid className={classes.marginBottom}>
            <Typography variant='h6' gutterBottom>
                Question caption
            </Typography>
            <Paper className={classes.section}>
                <TextField fullWidth
                    multiline
                    value={caption}
                    error={caption <= 0}
                    onChange={e => captionChangeHandler(e.target.value)}
                />
            </Paper>
        </Grid>
    )
}

const mapStateToProps = state => ({
    question: state.Creator.questions[state.Creator.selected],
})

const mapDispatchToStore = {
    updateQuestion
}


export default connect(mapStateToProps, mapDispatchToStore)(QuestionCaption)