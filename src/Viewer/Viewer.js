import React, { useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import axios from 'axios'
import { connect } from 'react-redux'
import './Viewer.scss'
import MainScreen from './Screens/MainScreen';
import AnswerHandlerContext from './Context/AnswerHandlerContext'
import InfoScreen from './Screens/Components/InfoScreen/InfoScreen';
import * as SCREENS from './screens'
import {
    addAnswer,
    throwError,
    showResults,
    loadResults,
    showQuestions,
    showCaption,
    saveQuestions,
    loadQuestions
} from '../redux/Viewer/actions'
import Footer from './Screens/Components/Footer/Footer'
import { Grid, makeStyles, Toolbar } from '@material-ui/core'
import { screenChangeTransitionTime as transitionTime, captionShowTime } from 'Viewer/constants'

const useStyles = makeStyles(theme => ({
    screen: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1,
    },
    temp: {
        height: '100%'
    },
    offset: theme.mixins.toolbar,
}))

const Viewer = ({ quizeeId, state, addAnswer, throwError, showResults, loadResults, showQuestions, showCaption, saveQuestions, loadQuestions }) => {
    const classes = useStyles()

    useEffect(() => {
        if (!quizeeId) return
        loadQuestions(quizeeId)

        axios.get(process.env.REACT_APP_QUIZEE_DB_URL + `quizees/${quizeeId}/content.json`)
            .then(res => {
                console.log(res)
                saveQuestions(res.data.caption, res.data.questions)
                showCaption()
                setTimeout(() => showQuestions(), captionShowTime)
            })
            .catch(err => {
                console.error(err)
                throwError(err.message)
            })
    }, [quizeeId, loadQuestions, saveQuestions, showCaption, showQuestions, throwError])

    function checkAnswers(lastAnswer) {
        loadResults()

        axios.get('http://localhost:5001/react-quizee-4fa1c/us-central1/checkAnswers?data='
            + JSON.stringify({ quizeeId: state.quizeeId, answers: [...state.answers, lastAnswer] }))
            .then(res => {
                setTimeout(() => {
                    showResults(res.data.message)
                }, transitionTime)
            })
            .catch(err => {
                throwError(err.message)
                // console.error(err)
            })
    }

    function pushAnswer(answer) {
        console.log('Answer received:', answer)
        addAnswer(answer)
        if (state.answers.length + 1 === state.questions.length) {
            checkAnswers(answer)
        }
    }

    let screen = <></>

    switch (state.screen) {
        case SCREENS.LOADER:
            screen = <InfoScreen loading={true}>{state.text}</InfoScreen>
            break
        case SCREENS.CAPTION:
            screen = <InfoScreen>{state.caption}</InfoScreen>
            break
        case SCREENS.QUEST:
            const question = state.questions[state.answers.length]
            screen = <MainScreen question={question} />
            break
        case SCREENS.ERROR:
            screen = <InfoScreen>{state.text}</InfoScreen>
            break
        case SCREENS.END_TITLE:
            screen = <InfoScreen>{state.text}</InfoScreen>
            break
        default:
            break
    }

    return (
        <AnswerHandlerContext.Provider
            value={pushAnswer}
        >
            <div className='Viewer'>
                <TransitionGroup className='transition'>
                    <CSSTransition
                        key={state.transitionKey}
                        timeout={transitionTime}
                        classNames='screen-change'
                        mountOnEnter
                        unmountOnExit
                    >
                        <Grid container direction='column' className={classes.temp}>
                            <Grid item className={classes.grow}>
                                {screen}
                            </Grid>
                            <Grid item className={'fakeFooter'}>
                                <Toolbar />
                            </Grid>
                        </Grid>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        </AnswerHandlerContext.Provider >
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
    showQuestions,
    showCaption,
    saveQuestions,
    loadQuestions,
    loadResults
}
export default connect(mapStateToProps, mapDispatchToProps)(Viewer)