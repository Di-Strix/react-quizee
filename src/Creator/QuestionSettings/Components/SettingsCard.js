import React from 'react'
import { Grid, Typography, Paper, Tooltip } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ErrorIcon from '@mui/icons-material/Error'
import { useErrorsFromQuestion } from 'Creator/Hooks/useErrorsFromQuestion'
import { getErrorString } from 'helperFunctions'
import { connect } from 'react-redux'

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
  gutterBottom: {
    marginBottom: theme.spacing(1),
  },
}))

const SettignsCard = ({ children, heading = '', AdditionalAction, acceptableErrors = [], errorsDictionary }) => {
  const classes = useStyles()
  const currentQuestionErrors = useErrorsFromQuestion(acceptableErrors)
  const showError = currentQuestionErrors.length > 0
  const errorMessage = showError ? getErrorString(currentQuestionErrors[0], errorsDictionary) : ''

  return (
    <Grid className={classes.marginBottom}>
      <Typography variant='h6' gutterBottom={!AdditionalAction} style={{ width: '100%' }}>
        <Grid container alignItems='center'>
          {heading}
          {showError && (
            <Tooltip title={<Typography variant='subtitle2'>{errorMessage}</Typography>}>
              <ErrorIcon className={classes.marginLeft} color='error' />
            </Tooltip>
          )}
          <div style={{ flexGrow: 1 }}></div>
          {AdditionalAction}
        </Grid>
      </Typography>
      <Paper className={classes.section}>{children}</Paper>
    </Grid>
  )
}

const mapStateToProps = state => ({
  errorsDictionary: state.Global.dictionary.Creator.errors,
})

export default connect(mapStateToProps)(SettignsCard)
