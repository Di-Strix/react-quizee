import React from 'react'
import { ANSWER_OPTIONS } from 'Creator/types'
import { connect } from 'react-redux'
import * as TYPES from 'redux/questionTypes'
import {
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    TextField,
    Typography,
    Checkbox,
    ListItemIcon,
    Radio,
    Tooltip,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { updateQuestion, updateAnswers } from 'redux/Creator/actions'
import DeleteIcon from '@material-ui/icons/Delete'
import ErrorIcon from '@material-ui/icons/Error'
import { checkAnswerOption, checkQuestion } from 'Creator/helperFunctions'

const AnswerOptions = ({state, question, config, classes, updateQuestion, updateAnswers}) => {
    if (!config[question.type].includes(ANSWER_OPTIONS)) {
        return null
    }

    const answersCheck = (() => {
        let res = checkAnswerOption(state.answers[state.selected])
        if (res.ok) {
            res = checkQuestion(state.questions[state.selected])
        }
        return res
    })()

    const answerOptionChangeHandler = (id, newCaption) => {
        const questionCopy = JSON.parse(JSON.stringify(question))
        const index = questionCopy.answerOptions.findIndex(value => value.id === id)
        if (index < 0) return
        questionCopy.answerOptions[index] = {...questionCopy.answerOptions[index], val: newCaption}
        updateQuestion(questionCopy)
    }

    const deleteHandler = (id) => {
        if (question.answerOptions.length <= 1) return
        const questionCopy = JSON.parse(JSON.stringify(question))
        questionCopy.answerOptions = questionCopy.answerOptions.filter(answer => answer.id !== id)
        updateQuestion(questionCopy)

        const stateAnswersCopy = JSON.parse(JSON.stringify(state.answers))
        if (question.type === TYPES.SEVERAL_TRUE) {
            if (stateAnswersCopy[state.selected].answer.includes(id)) {
                stateAnswersCopy[state.selected].answer = stateAnswersCopy[state.selected].answer.filter(val => val !== id)
            }
        } else if (stateAnswersCopy[state.selected] === id) {
            stateAnswersCopy[state.selected] = {answer: null, config: {}}
        }
        updateAnswers(stateAnswersCopy)
    }

    const addHandler = () => {
        const questionCopy = JSON.parse(JSON.stringify(question))
        questionCopy.answerOptions.push({id: new Date().getTime(), val: 'Answer'})
        updateQuestion(questionCopy)
    }

    const radioHandler = id => {
        const stateAnswersCopy = JSON.parse(JSON.stringify(state.answers))
        stateAnswersCopy[state.selected].answer = id
        updateAnswers(stateAnswersCopy)
    }

    const checkBoxHandler = (id) => {
        const stateAnswersCopy = JSON.parse(JSON.stringify(state.answers))
        if (stateAnswersCopy[state.selected].answer.includes(id)) {
            stateAnswersCopy[state.selected].answer = stateAnswersCopy[state.selected].answer.filter(val => val !== id)
        } else {
            stateAnswersCopy[state.selected].answer.push(id)
        }
        updateAnswers(stateAnswersCopy)
    }

    let ListAction
    if (question.type === TYPES.ONE_TRUE) {
        ListAction = id => (<Radio
            checked={state.answers[state.selected].answer === id}
            onChange={() => radioHandler(id)}
        />)
    } else {
        ListAction = id => (<Checkbox
            checked={state.answers[state.selected].answer.includes(id)}
            onChange={() => checkBoxHandler(id)}
        />)
    }

    return (
        <Grid className={classes.marginBottom}>
            <Grid container alignItems='center' justify='space-between'>
                <Grid container alignItems='center' style={{width: 'auto'}}>
                    <Typography variant='h6'>Answer options</Typography>
                    {
                        !answersCheck.ok &&
                        <Tooltip title={<Typography variant='subtitle2'>{answersCheck.message}</Typography>}>
                            <ErrorIcon className={classes.marginLeft} color='error'/>
                        </Tooltip>
                    }
                </Grid>
                <IconButton onClick={addHandler}><AddIcon/></IconButton>
            </Grid>
            <Paper className={classes.section}>
                <List>
                    {question.answerOptions.map((answer) => (
                        <ListItem key={answer.id} style={{paddingLeft: 0}}>
                            <ListItemIcon style={{minWidth: 0}}>
                                {ListAction(answer.id)}
                            </ListItemIcon>
                            <ListItemText primary={
                                <TextField
                                    fullWidth
                                    value={answer.val}
                                    error={answer.val.length <= 0}
                                    multiline
                                    onChange={e => answerOptionChangeHandler(answer.id, e.target.value)}
                                />
                            }/>
                            <ListItemSecondaryAction>
                                <IconButton edge='end' onClick={() => deleteHandler(answer.id)}
                                            disabled={question.answerOptions.length <= 1}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Grid>
    )
}

const mapStateToProps = state => ({
    question: state.Creator.questions[state.Creator.selected],
    state: state.Creator,
})
const mapDispatchToProps = {
    updateQuestion,
    updateAnswers,
}


export default connect(mapStateToProps, mapDispatchToProps)(AnswerOptions)
