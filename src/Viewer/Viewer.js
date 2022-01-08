import React, { useContext, useEffect, useMemo, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux'
import './Viewer.scss'
import MainScreen from './Screens/MainScreen'
import AnswerHandlerContext from './Context/AnswerHandlerContext'
import InfoScreen from './Screens/Components/InfoScreen/InfoScreen'
import * as SCREENS from 'redux/Viewer/screens'
import {
  addAnswer,
  throwError,
  showResults,
  loadResults,
  showQuestionsScreen,
  showCaptionScreen,
  saveQuestions,
  loadQuestions,
  updateTransitionKey,
  setLoading,
  setText,
  setFooterButtonState,
} from '../redux/Viewer/actions'
import Footer from './Screens/Components/Footer/Footer'
import { Grid, Toolbar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { screenChangeTransitionTime as transitionTime, captionShowTime } from 'Viewer/constants'
import IsConstructorMode from './Context/IsConstructorModeContext'
import { placeDataToLocString } from 'helperFunctions'
import { useGotoPath } from 'LangSelector'
import { firebaseContext } from 'Context/Firebase/Firebase'

const useStyles = makeStyles(theme => ({
  constructorViewer: {
    height: '100%',
    width: '100%',
  },
  screen: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  fullHeight: {
    height: '100%',
  },
  offset: theme.mixins.toolbar,
}))

const Viewer = props => {
  const classes = useStyles()
  const gotoPath = useGotoPath()
  const { fetchQuizeeQuestions, checkAnswers } = useContext(firebaseContext)

  const fetchQuizee = useMemo(() => {
    if (props.ConstructorMode) {
      return () => {
        props.saveQuestions([props.question])
        props.setText(props.question.caption)
        props.showQuestionsScreen()
      }
    }
    return () => {
      if (!props.state.quizeeId) return gotoPath('')
      const startTime = new Date().getTime()
      props.showCaptionScreen()
      const loaderId = setTimeout(() => {
        props.setLoading(true)
      }, 1000)

      fetchQuizeeQuestions(props.state.quizeeId)
        .then(res => {
          props.saveQuestions(res.questions)
          const elapsed = new Date().getTime() - startTime
          setTimeout(
            () => {
              props.updateTransitionKey()
              props.showQuestionsScreen()
            },
            elapsed >= captionShowTime ? 0 : captionShowTime - elapsed
          )
        })
        .catch(err => {
          console.error(err)
          props.throwError(err.message)
        })
        .finally(() => {
          clearTimeout(loaderId)
        })
    }
    // eslint-disable-next-line
  }, [
    props.ConstructorMode,
    props.state.quizeeId,
    props.loadQuestions,
    props.saveQuestions,
    props.showCaptionScreen,
    props.showQuestionsScreen,
    props.throwError,
    props.question,
  ])

  useEffect(fetchQuizee, [fetchQuizee])

  const performAnswersCheck = useMemo(() => {
    if (props.ConstructorMode) {
      return () => {}
    }
    return lastAnswer => {
      props.updateTransitionKey()
      props.showCaptionScreen()
      props.setText(props.dictionary.PROCESSING_ANSWERS)
      props.setLoading(true)
      props.setFooterButtonState(false)

      checkAnswers({ quizeeId: props.state.quizeeId, answers: [...props.state.answers, lastAnswer] })
        .then(res => {
          setTimeout(() => {
            props.updateTransitionKey()
            props.setLoading(false)
            props.setText(placeDataToLocString(props.dictionary.RESULTS_TEXT, res))
          }, transitionTime)
        })
        .catch(err => {
          props.throwError(err.message)
        })
    }
    // eslint-disable-next-line
  }, [
    props.ConstructorMode,
    props.updateTransitionKey,
    props.showCaptionScreen,
    props.setText,
    props.setLoading,
    props.setFooterButtonState,
    props.throwError,
    props.state.answers,
  ])

  const pushAnswer = useMemo(() => {
    if (props.ConstructorMode) {
      return () => {}
    }
    return answer => {
      console.log('Answer received:', answer)
      props.addAnswer(answer)
      props.updateTransitionKey()
      if (props.state.answers.length + 1 === props.state.questions.length) {
        performAnswersCheck(answer)
      }
    }
    // eslint-disable-next-line
  }, [props.addAnswer, props.updateTransitionKey, props.state.answers, props.state.questions, performAnswersCheck])

  let screen = <></>

  switch (props.state.screen) {
    case SCREENS.CAPTION:
      screen = <InfoScreen loading={props.state.loading} caption={props.state.text} />
      break
    case SCREENS.QUEST:
      const question = props.state.questions[props.state.answers.length]
      screen = <MainScreen question={question} />
      break
    case SCREENS.ERROR:
      screen = <InfoScreen caption={props.state.text}></InfoScreen>
      break
    default:
      console.error('No screen found as requested:', props.state.screen)
      break
  }

  return (
    <AnswerHandlerContext.Provider value={pushAnswer}>
      <IsConstructorMode.Provider value={props.ConstructorMode}>
        <div className={['Viewer', props.ConstructorMode ? classes.constructorViewer : ''].join(' ')}>
          {props.ConstructorMode ? (
            <Grid container direction='column' className={classes.fullHeight}>
              <Grid item className={classes.grow}>
                {screen}
              </Grid>
            </Grid>
          ) : (
            <React.Fragment>
              <TransitionGroup className='transition'>
                <CSSTransition
                  key={props.state.transitionKey}
                  timeout={transitionTime}
                  classNames='screen-change'
                  mountOnEnter
                  unmountOnExit
                >
                  <Grid container direction='column' className={classes.fullHeight}>
                    <Grid item className={classes.grow}>
                      {screen}
                    </Grid>
                    <Grid item className='fakeFooter'>
                      <Toolbar />
                    </Grid>
                  </Grid>
                </CSSTransition>
              </TransitionGroup>
              <Footer />
            </React.Fragment>
          )}
        </div>
      </IsConstructorMode.Provider>
    </AnswerHandlerContext.Provider>
  )
}

const mapStateToProps = state => ({
  state: state.Viewer,
  dictionary: state.Global.dictionary.Viewer,
})

const mapDispatchToProps = {
  addAnswer,
  throwError,
  showResults,
  showQuestionsScreen,
  showCaptionScreen,
  saveQuestions,
  loadQuestions,
  loadResults,
  updateTransitionKey,
  setText,
  setLoading,
  setFooterButtonState,
}
export default connect(mapStateToProps, mapDispatchToProps)(Viewer)
