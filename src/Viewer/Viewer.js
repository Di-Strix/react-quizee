import React, { useEffect } from 'react'
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
    setFooterButtonState
} from '../redux/Viewer/actions'
import Footer from './Screens/Components/Footer/Footer'
import { Grid, makeStyles, Toolbar } from '@material-ui/core'
import { screenChangeTransitionTime as transitionTime, captionShowTime } from 'Viewer/constants'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    screen: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
    temp: {
        height: '100%'
    },
    offset: theme.mixins.toolbar
}))

const Viewer = (props) => {
    const classes = useStyles()
    const history = useHistory()

    useEffect(() => {
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
        // eslint-disable-next-line
    }, [props.state.quizeeId, props.loadQuestions, props.saveQuestions, props.showCaptionScreen, props.showQuestionsScreen, props.throwError, history])

    function checkAnswers(lastAnswer) {
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

    function pushAnswer(answer) {
        console.log('Answer received:', answer)
        props.addAnswer(answer)
        props.updateTransitionKey()
        if (props.state.answers.length + 1 === props.state.questions.length) {
            checkAnswers(answer)
        }

    }

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
            console.log('No screen found as requested:', props.state.screen)
            break
    }

    return (
        <AnswerHandlerContext.Provider
            value={pushAnswer}
        >
            <div className='Viewer'>
                <TransitionGroup className='transition'>
                    <CSSTransition
                        key={props.state.transitionKey}
                        timeout={transitionTime}
                        classNames='screen-change'
                        mountOnEnter
                        unmountOnExit
                    >
                        <Grid container direction='column' className={classes.temp}>
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
            </div>
        </AnswerHandlerContext.Provider>
    )
}

const mapStateToProps = state => {
    return {
        state: state.Viewer
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
    setFooterButtonState
}
export default connect(mapStateToProps, mapDispatchToProps)(Viewer)
