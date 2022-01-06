import React from 'react'
import { connect } from 'react-redux'
import { Grid } from '@mui/material'
import * as TYPES from 'redux/questionTypes'
import { QUESTION_CAPTION, QUESTION_TYPE, ANSWER_OPTIONS, ANSWER_INPUT } from '../types'
import { makeStyles } from '@mui/styles'
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
      <Grid item className={classes.margin}>
        {CONFIG[question.type].map(key => {
          const Option = SettingsOptions[key]
          return <Option key={key} />
        })}
      </Grid>
    </Grid>
  )
}

const mapStateToProps = state => ({
  question: state.Creator.questions[state.Creator.selected],
  state: state.Creator,
})

export default connect(mapStateToProps)(QuestionSettings)
