import React from 'react'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import * as TYPES from 'redux/questionTypes'
import { QUESTION_CAPTION, QUESTION_TYPE, ANSWER_OPTIONS, ANSWER_INPUT } from '../types'
import { makeStyles } from '@material-ui/core/styles'
import { updateQuestion, updateAnswers } from 'redux/Creator/actions'
import SettingsOptions from './SettingsOptions'

const CONFIG = {
    [TYPES.ONE_TRUE]: [QUESTION_CAPTION, QUESTION_TYPE, ANSWER_OPTIONS],
    [TYPES.SEVERAL_TRUE]: [QUESTION_CAPTION, QUESTION_TYPE, ANSWER_OPTIONS],
    [TYPES.WRITE_ANSWER]: [QUESTION_CAPTION, QUESTION_TYPE, ANSWER_INPUT],
}

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1.5),
    },
}))

function QuestionSettings({ question }) {
    const classes = useStyles()

    return (
        <Grid style={{ height: '100%', width: '100%', overflowY: 'auto' }}>
            <Grid
                item
                className={classes.margin}
            >
                {
                    CONFIG[question.type].map(key => {
                        const Option = SettingsOptions[key]
                        return (
                            <Option
                                key={key}
                            />
                        )
                    })
                }
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
