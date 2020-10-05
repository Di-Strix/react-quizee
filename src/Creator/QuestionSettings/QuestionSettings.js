import React, { useCallback, useState } from 'react'
import { connect } from 'react-redux'
import {
    Grid,
    TextField,
    Typography,
    Paper,
    Select,
    MenuItem,
    debounce
} from '@material-ui/core'
import * as TYPES from 'redux/questionTypes'
import { ANSWER_OPTIONS, ANSWER_INPUT } from '../types'
import { makeStyles } from '@material-ui/core/styles'
import { updateQuestion, updateAnswers } from 'redux/Creator/actions'
import SettingsOptions from './SettingsOptions'

const CONFIG = {
    [TYPES.ONE_TRUE]: [ANSWER_OPTIONS],
    [TYPES.SEVERAL_TRUE]: [ANSWER_OPTIONS],
    [TYPES.WRITE_ANSWER]: [ANSWER_INPUT],
}

const useStyles = makeStyles(theme => ({
    takeAllSpace: {
        height: '100%',
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    margin: {
        margin: theme.spacing(1.5),
    },
    marginBottom: {
        marginBottom: theme.spacing(2),
    },
    section: {
        padding: theme.spacing(1.6),
    },
    marginLeft: {
        marginLeft: theme.spacing(1),
    },
}))

function QuestionSettings({ question, updateQuestion, updateAnswers, state }) {
    const classes = useStyles()
    const [caption, setCaption] = useState(() => question.caption)

    const dispatchToStore = useCallback(debounce(value => {
        const questionCopy = JSON.parse(JSON.stringify(question))
        questionCopy.caption = value
        updateQuestion(questionCopy)
    }, 300), [question, updateQuestion])

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

    const captionChangeHandler = value => {
        setCaption(value)
        dispatchToStore(value)
    }

    return (
        <Grid style={{ height: '100%', width: '100%', overflowY: 'auto' }}>
            <Grid
                item
                className={classes.margin}
            >
                <Grid
                    container
                    direction='column'
                >
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
                    <Grid className={classes.marginBottom}>
                        <Grid container justify='space-between' alignItems='center'>
                            <Typography variant='h6' gutterBottom>Question type</Typography>
                        </Grid>
                        <Paper className={classes.section}>
                            <Select value={question.type} onChange={typeChangeHandler} style={{ width: '100%' }}>
                                <MenuItem value={TYPES.ONE_TRUE}>One true</MenuItem>
                                <MenuItem value={TYPES.SEVERAL_TRUE}>Several true</MenuItem>
                                <MenuItem value={TYPES.WRITE_ANSWER}>Write answer</MenuItem>
                            </Select>
                        </Paper>
                    </Grid>

                    {
                        CONFIG[question.type].map(key => {
                            const Option = SettingsOptions[key]
                            return (
                                <Option
                                    key={key}
                                    classes={classes}
                                />
                            )
                        })
                    }
                </Grid>
            </Grid>
        </Grid>

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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionSettings)
