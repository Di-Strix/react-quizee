import React, { useEffect, useMemo } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import axios from 'axios'
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
import { Grid, makeStyles, Toolbar } from '@material-ui/core'
import { screenChangeTransitionTime as transitionTime, captionShowTime } from 'Viewer/constants'
import { useHistory } from 'react-router-dom'
import IsConstructorMode from './Context/IsConstructorModeContext'

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

const Viewer = (props) => {
    const classes = useStyles()
    const history = useHistory()

    const fetchQuizee = useMemo(() => {
        if (props.ConstructorMode) {
            return () => {
                props.saveQuestions([props.question])
                props.setText(props.question.caption)
                props.showQuestionsScreen()
            }
        }
        return () => {
            if (!props.state.quizeeId) return history.push('/')
            const startTime = new Date().getTime()
            props.showCaptionScreen()
            const loaderId = setTimeout(() => {
                props.setLoading(true)
            }, 1000)

            axios.get(process.env.REACT_APP_QUIZEE_DB_URL + `quizees/${props.state.quizeeId}/content.json`)
                .then(res => {
                    console.log(res)
                    props.saveQuestions(res.data.questions)
                    const elapsed = new Date().getTime() - startTime
                    setTimeout(() => {
                        props.updateTransitionKey()
                        props.showQuestionsScreen()
                    }, elapsed >= captionShowTime ? 0 : captionShowTime - elapsed)
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
        history,
        props.question,
    ])

    useEffect(fetchQuizee, [fetchQuizee])

    const checkAnswers = useMemo(() => {
        if (props.ConstructorMode) {
            return () => {
            }
        }
        return (lastAnswer) => {
            props.updateTransitionKey()
            props.showCaptionScreen()
            props.setText('Please wait, we are processing your answers🎉')
            props.setLoading(true)
            props.setFooterButtonState(false)

            axios.get(process.env.REACT_APP_QUIZEE_API_URL + 'checkAnswers?data='
                + JSON.stringify({quizeeId: props.state.quizeeId, answers: [...props.state.answers, lastAnswer]}))
                .then(res => {
                    setTimeout(() => {
                        props.updateTransitionKey()
                        props.setLoading(false)
                        props.setText(`Woohoo! You've ${res.data.message}% correct answers!`)
                    }, transitionTime)
                })
                .catch(err => {
                    props.throwError(err.message)
                })
        }
        // eslint-disable-next-line
    }, [props.ConstructorMode, props.updateTransitionKey, props.showCaptionScreen, props.setText, props.setLoading, props.setFooterButtonState, props.throwError, props.state.answers])

    const pushAnswer = useMemo(() => {
            if (props.ConstructorMode) {
                return () => {
                }
            }
            return answer => {
                console.log('Answer received:', answer)
                props.addAnswer(answer)
                props.updateTransitionKey()
                if (props.state.answers.length + 1 === props.state.questions.length) {
                    checkAnswers(answer)
                }
            }
            // eslint-disable-next-line
        }, [props.addAnswer, props.updateTransitionKey, props.state.answers, props.state.questions, checkAnswers],
    )

    let screen = <></>

    switch (props.state.screen) {
        case SCREENS.CAPTION:
            screen = <InfoScreen loading={props.state.loading}>{props.state.text}</InfoScreen>
            break
        case SCREENS.QUEST:
            const question = props.state.questions[props.state.answers.length]
            screen = <MainScreen question={question}/>
            break
        case SCREENS.ERROR:
            screen = <InfoScreen>{props.state.text}</InfoScreen>
            break
        default:
            console.error('No screen found as requested:', props.state.screen)
            break
    }

    return (
        <AnswerHandlerContext.Provider
            value={pushAnswer}
        >
            <IsConstructorMode.Provider
                value={props.ConstructorMode}
            >
                <div className={['Viewer', props.ConstructorMode ? classes.constructorViewer : ''].join(' ')}>
                    {
                        props.ConstructorMode
                            ? (<Grid container direction='column' className={classes.fullHeight}>
                                <Grid item className={classes.grow}>
                                    {screen}
                                </Grid>
                            </Grid>)
                            : (<React.Fragment>
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
                                                    <Toolbar/>
                                                </Grid>
                                            </Grid>
                                        </CSSTransition>
                                    </TransitionGroup>
                                    <Footer/>
                                </React.Fragment>
                            )
                    }

                </div>
            </IsConstructorMode.Provider>
        </AnswerHandlerContext.Provider>
    )
}

const mapStateToProps = state => {
    return {
        state: state.Viewer,
    }
}
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
