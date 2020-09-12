import React, { useEffect } from 'react'
import {
    Grid,
    List,
    ListItem,
    ListItemText,
    Paper,
    TextField,
    Typography,
    ListItemIcon,
    Checkbox,
    Tooltip,
} from '@material-ui/core'
import { connect } from 'react-redux'
import { updateAnswers } from 'redux/Creator/actions'
import { ANSWER_INPUT } from '../../types'
import ErrorIcon from '@material-ui/icons/Error'
import { checkAnswerOption } from 'Creator/helperFunctions'

const configKeys = ['equalCase']

const AnswerInput = ({config, updateAnswers, question, classes, state, answer}) => {
    // debugger
    const shouldNotRender = !config[question.type].includes(ANSWER_INPUT)

    useEffect(() => {
        if (!shouldNotRender)
            answerChangeHandler('')
        //eslint-disable-next-line
    }, [shouldNotRender])

    if (shouldNotRender) {
        return null
    }

    const answersCheck = checkAnswerOption(state.answers[state.selected])

    const answerChangeHandler = value => {
        const stateAnswersCopy = JSON.parse(JSON.stringify(state.answers))
        stateAnswersCopy[state.selected].answer = value
        updateAnswers(stateAnswersCopy)
    }

    const configChangeHandler = key => {
        const stateAnswersCopy = JSON.parse(JSON.stringify(state.answers))
        stateAnswersCopy[state.selected].config[key] = !stateAnswersCopy[state.selected].config[key]
        updateAnswers(stateAnswersCopy)
    }
    return (
        <Grid className={classes.marginBottom}>
            <Grid container alignItems='center' justify='space-between'>
                <Grid container alignItems='center' style={{width: 'auto'}}>
                    <Typography variant='h6'>Answer</Typography>
                    {
                        !answersCheck.ok &&
                        <Tooltip title={<Typography variant='subtitle2'>{answersCheck.message}</Typography>}>
                            <ErrorIcon className={classes.marginLeft} color='error'/>
                        </Tooltip>
                    }
                </Grid>
            </Grid>
            <Paper className={classes.section}>
                <List>
                    <ListItem>
                        <ListItemText primary={
                            <TextField
                                fullWidth
                                value={answer.answer || ''}
                                error={!Boolean(answer.answer && answer.answer.length >= 0)}
                                onChange={e => answerChangeHandler(e.target.value)}
                            />
                        }/>
                    </ListItem>
                    {
                        configKeys.map(key => (
                            <ListItem key={key}>
                                <ListItemIcon style={{minWidth: 0}}>
                                    <Checkbox
                                        edge='start'
                                        onChange={() => configChangeHandler(key)}
                                        checked={state.answers[state.selected].config[key] || false}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={'Must equal case'}/>
                            </ListItem>
                        ))
                    }
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
