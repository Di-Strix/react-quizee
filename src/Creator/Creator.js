import React, { useCallback, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Grid, Divider, Typography, Button, AppBar, Toolbar, IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PublishIcon from '@mui/icons-material/Publish'
import HomeIcon from '@mui/icons-material/Home'
import Viewer from '../Viewer/Viewer'
import QuestionsOverview from './QuestionsOverview/QuestionsOverview'
import { createQuestion, setSelected, updateQuestionsList, flushCreatorData } from 'redux/Creator/actions'
import QuestionSettings from './QuestionSettings/QuestionSettings'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { checkQuestions } from './verificationFunctions'
import VerificationContext from './Context/VerificationContext'
import { useGotoPath } from 'LangSelector'

const useStyles = makeStyles(theme => ({
  root: {
    flexWrap: 'nowrap',
  },
  Creator: {
    flexWrap: 'nowrap',
    flexGrow: 1,
    overflow: 'hidden',
  },
  section: {
    height: '100%',
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  noTextTransform: {
    textTransform: 'none',
  },
  takeAllSpace: {
    height: '100%',
    width: '100%',
  },
  noWrap: {
    flexWrap: 'nowrap',
  },
  homeButton: {
    marginRight: theme.spacing(2),
  },
}))

const defaultSnackSettings = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
  preventDuplicate: true,
}

const Creator = ({
  state,
  createQuestion,
  setSelected,
  updateQuestionsList,
  dictionary,
  errorDictionary,
  flushCreatorData,
}) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const [published, setPublished] = useState(false)
  const [verificationResults, setVerificationResults] = useState([])
  const gotoPath = useGotoPath()

  useEffect(() => {
    const allErrors = checkQuestions(state.questions)
    let currentQuestionErrors = allErrors.filter(err => err.index === state.selected)
    if (currentQuestionErrors.length > 0) currentQuestionErrors = currentQuestionErrors[0].errors
    setVerificationResults({ allErrors, currentQuestionErrors })
  }, [state.questions, state.selected])

  const questionCreateHandler = useCallback(() => {
    createQuestion()
  }, [createQuestion])

  const questionRemoveHandler = useCallback(
    index => {
      const newQuestions = JSON.parse(JSON.stringify(state.questions)).filter((_, i) => i !== index)

      setSelected(newQuestions[index] ? index : newQuestions[index - 1] ? index - 1 : -1)
      updateQuestionsList(newQuestions)
    },
    [state.questions, updateQuestionsList, setSelected]
  )

  const throwErrorMessage = message => {
    enqueueSnackbar(message, {
      ...defaultSnackSettings,
      variant: 'error',
    })
  }
  const throwSuccMessage = message => {
    enqueueSnackbar(message, {
      ...defaultSnackSettings,
      variant: 'success',
    })
  }

  const publishHandler = () => {
    if (!state.caption.trim()) {
      throwErrorMessage(errorDictionary.ERR_QUIZEE_CAPTION_EMPTY)
      return
    }
    if (state.questions.length < 1) {
      throwErrorMessage(errorDictionary.ERR_QUIZEE_TO_FEW_QUESTIONS)
      return
    }
    if (verificationResults.allErrors.length > 0) {
      throwErrorMessage(dictionary.errors.ERR_QUESTIONS_ARE_HAVING_ERRORS)
      setSelected(verificationResults.allErrors[0].index)
      return
    }

    const answers = []
    const questions = []

    state.questions.forEach(question => {
      answers.push({
        answer: question.answer,
        config: question.config,
      })
      questions.push({
        type: question.type,
        caption: question.caption,
        answerOptions: question.answerOptions,
      })
    })

    const dataToPublish = {
      answers: answers,
      content: {
        caption: state.caption,
        questions: questions,
      },
    }
    throwSuccMessage(dictionary.ALL_CHECKS_PASSED_PUBLISHING, dataToPublish)
    axios.post(process.env.REACT_APP_QUIZEE_DB_URL + 'quizees.json', dataToPublish).then(res => {
      if (res.data.name) throwSuccMessage(dictionary.PUBLISHED_SUCCESSFULLY)
      else setPublished(false)
      console.log(res)
    })
    setPublished(true)
  }

  return (
    <VerificationContext.Provider value={verificationResults}>
      <Grid container style={{ width: '100vw', height: '100vh', flexWrap: 'nowrap' }} direction='column'>
        <AppBar position='static'>
          <Toolbar variant='dense'>
            <IconButton
              edge='start'
              color='inherit'
              className={classes.homeButton}
              onClick={() => {
                let conf = true
                if (!published) {
                  conf = window.confirm(dictionary.EXIT_CONFIRM)
                }
                if (!conf) return
                flushCreatorData()
                gotoPath('')
              }}
            >
              <HomeIcon />
            </IconButton>
            <Typography variant='h5'>Creator</Typography>
            <div style={{ flexGrow: 1 }} />
            <Button
              disabled={published}
              onClick={publishHandler}
              variant='outlined'
              color='inherit'
              endIcon={<PublishIcon />}
            >
              {dictionary.PUBLISH_QUIZEE}
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container direction='row' className={classes.Creator}>
          <Grid container item xs={2} direction='column' justify='center' className={classes.noWrap}>
            <QuestionsOverview onAdd={questionCreateHandler} onRemove={questionRemoveHandler} />
          </Grid>
          <Divider orientation='vertical' flexItem light />
          <Grid container item justify='center' alignContent='center' xs={7}>
            {state.questions.length > 0 ? (
              <Viewer ConstructorMode question={state.questions[state.selected]} />
            ) : (
              <Button className={classes.noTextTransform} color='primary' variant='contained'>
                <Typography component='h1' variant='h5' onClick={questionCreateHandler}>
                  {dictionary.CREATE_FIRST_QUESTION}
                </Typography>
              </Button>
            )}
          </Grid>
          <Divider orientation='vertical' flexItem light />
          <Grid item xs={3}>
            {state.selected >= 0 ? (
              <QuestionSettings />
            ) : (
              <Grid container justify='center' alignContent='center' className={classes.takeAllSpace}>
                <Typography component='h2' variant='h6' color='textSecondary'>
                  {dictionary.sections.QuestionSettings.PLACEHOLDER}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </VerificationContext.Provider>
  )
}

const mapStateToProps = state => ({
  state: state.Creator,
  dictionary: state.Global.dictionary.Creator,
  errorDictionary: state.Global.dictionary.Creator.errors,
})
const mapDispatchToProps = {
  createQuestion,
  setSelected,
  updateQuestionsList,
  flushCreatorData,
}

export default connect(mapStateToProps, mapDispatchToProps)(Creator)
