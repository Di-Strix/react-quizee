import React from 'react'
import {
    Grid,
    List,
    ListItem,
    ListItemText,
    Paper,
    TextField,
    Typography,
} from '@material-ui/core'
import { connect } from 'react-redux'
import { updateAnswers } from 'redux/Creator/actions'
import { ANSWER_INPUT } from '../../types'

const AnswerInput = ({config, updateAnswers, question, classes, state, answer}) => {
    if (!config[question.type].includes(ANSWER_INPUT)) {
        return null
    }

    const answerChangeHandler = value => {
        const stateAnswersCopy = JSON.parse(JSON.stringify(state.answers))
        stateAnswersCopy[state.selected] = value
        updateAnswers(stateAnswersCopy)
    }

    return (
        <Grid className={classes.marginBottom}>
            <Typography variant='h6'>Answer</Typography>
            <Paper className={classes.section}>
                <List>
                    <ListItem>
                        <ListItemText primary={
                            <TextField
                                fullWidth
                                value={answer || ''}
                                onChange={e => answerChangeHandler(e.target.value)}
                            />
                        }/>
                    </ListItem>
                </List>
            </Paper>
        </Grid>
    )
}

const mapStateToProps = state => ({
    state: state.Creator,
    answer: state.Creator.answers[state.Creator.selected],
    question: state.Creator.questions[state.Creator.selected],
})
const mapDispatchToProps = {
    updateAnswers,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerInput)
