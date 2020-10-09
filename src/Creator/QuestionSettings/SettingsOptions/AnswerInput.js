import React, { useCallback, useEffect, useState } from 'react'
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
    debounce, makeStyles
} from '@material-ui/core'
import { connect } from 'react-redux'
import { updateAnswers } from 'redux/Creator/actions'
import ErrorIcon from '@material-ui/icons/Error'
import { checkAnswerOption } from 'Creator/helperFunctions'
import SettingsCard from '../Components/SettingsCard'

const configKeys = ['equalCase']

const useStyles = makeStyles(theme => ({
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

const AnswerInput = ({ updateAnswers, state, answer }) => {
    const [inputValue, setInputValue] = useState(answer.answer)
    const classes = useStyles()

    const dispatchToStore = useCallback(debounce(value => {
        const stateAnswersCopy = JSON.parse(JSON.stringify(state.answers))
        stateAnswersCopy[state.selected].answer = value
        updateAnswers(stateAnswersCopy)
    }, 300), [state, updateAnswers])

    const answersCheck = checkAnswerOption(state.answers[state.selected])

    const answerChangeHandler = value => {
        setInputValue(value)
        dispatchToStore(value)
    }

    const configChangeHandler = key => {
        const stateAnswersCopy = JSON.parse(JSON.stringify(state.answers))
        stateAnswersCopy[state.selected].config[key] = !stateAnswersCopy[state.selected].config[key]
        updateAnswers(stateAnswersCopy)
    }
    return (
        <SettingsCard
            heading={'Answer'}
            showError={!answersCheck.ok}
            errorMessage={answersCheck.message}
        >
            <TextField
                fullWidth
                value={inputValue || ''}
                error={!Boolean(inputValue && inputValue.length >= 0)}
                onChange={e => answerChangeHandler(e.target.value)}
            />
            <List style={{paddingBottom: 0}}>
                {
                    configKeys.map(key => (
                        <ListItem key={key}>
                            <ListItemIcon style={{ minWidth: 0 }}>
                                <Checkbox
                                    edge='start'
                                    onChange={() => configChangeHandler(key)}
                                    checked={state.answers[state.selected].config[key] || false}
                                />
                            </ListItemIcon>
                            <ListItemText primary={'Must equal case'} />
                        </ListItem>
                    ))
                }
            </List>
        </SettingsCard>
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
