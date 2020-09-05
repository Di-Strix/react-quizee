import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { Grid, makeStyles, Divider, Typography, Button, AppBar, Toolbar } from '@material-ui/core'
import PublishIcon from '@material-ui/icons/Publish'
import Viewer from '../Viewer/Viewer'
import QuestionsOverview from './QuestionsOverview/QuestionsOverview'
import { createQuestion, setSelected, updateQuestionsList, updateAnswers } from 'redux/Creator/actions'
import QuestionSettings from './QuestionSettings/QuestionSettings'
import axios from 'axios'

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

}))

const Creator = ({state, createQuestion, setSelected, updateQuestionsList, updateAnswers}) => {
    const classes = useStyles()

    const questionCreateHandler = useCallback(() => {
        createQuestion()
    }, [createQuestion])

    const questionRemoveHandler = useCallback(index => {
        const newQuestions = JSON.parse(JSON.stringify(state.questions))
            .filter((_, i) => i !== index)
        const newAnswers = JSON.parse(JSON.stringify(state.answers))
            .filter((_, i) => i !== index)

        setSelected(newQuestions[index] ? index : newQuestions[index - 1] ? index - 1 : -1)
        updateQuestionsList(newQuestions)
        updateAnswers(newAnswers)
    }, [state.questions, state.answers, updateQuestionsList, updateAnswers, setSelected])

    const publishHandler = () => {
        if (!state.caption.trim()) {
            console.error('Caption cannot be empty')
            return
        }
        if (state.questions.length <= 0) {
            console.error('Quizee must contain at least one question')
            return
        }
        const answerCheckSuccess = state.answers.every((answer, index) => {
            if (Array.isArray(answer.answer)) {
                if (answer.answer.length <= 0) {
                    setSelected(index)
                    console.error('Answer options should contain at least one option', index)
                    return false
                }
            } else if (answer.answer === null) {
                setSelected(index)
                console.error('Question must contain at least one true answer', index)
                return false
            } else if (typeof answer.answer === 'string' && !answer.answer.trim()) {
                setSelected(index)
                console.error('Question answer must contain at least one character', index)
                return false
            }
            return true
        })
        if (!answerCheckSuccess) return

        const questionsCheckSuccess = state.questions.every((question, index) => {
            if (!question.caption.trim()) {
                setSelected(index)
                console.error('Caption cannot be empty')
                return false
            }

            if (Array.isArray(question.answerOptions)) {
                const succ = question.answerOptions.every((answer) => answer.id !== null && answer.val.trim())
                if (!succ) {
                    setSelected(index)
                    console.error('Answer option cannot be empty')
                    return false
                }
            }

            return true
        })

        if (!questionsCheckSuccess) return

        const dataToPublish = {
            answers: state.answers,
            content: {
                caption: state.caption,
                questions: state.questions,
            },
        }
        console.log('all checks passed, publishing', dataToPublish)
        axios.post(process.env.REACT_APP_QUIZEE_DB_URL + 'quizees.json', dataToPublish).then(res => {
            console.log(res)
        })
    }

    return (
        <Grid
            container
            style={{width: '100vw', height: '100vh', flexWrap: 'nowrap'}}
            direction='column'
        >
            <AppBar position="static">
                <Toolbar variant='dense'>
                    <Typography variant='h5'>Creator</Typography>
                    <div style={{flexGrow: 1}}/>
                    <Button onClick={publishHandler} variant='outlined' color="inherit"
                            endIcon={<PublishIcon/>}>Publish</Button>
                </Toolbar>
            </AppBar>
            <Grid
                container
                direction='row'
                className={classes.Creator}
            >
                <Grid
                    container
                    item
                    xs={2}
                    direction='column'
                    justify='center'
                    className={classes.noWrap}
                >
                    <QuestionsOverview onAdd={questionCreateHandler} onRemove={questionRemoveHandler}/>
                </Grid>
                <Divider orientation='vertical' flexItem light/>
                <Grid
                    container
                    item
                    justify='center'
                    alignContent='center'
                    xs={7}
                >
                    {
                        state.questions.length > 0
                            ? <Viewer ConstructorMode question={state.questions[state.selected]}/>
                            : <Button className={classes.noTextTransform} color='primary' variant='contained'>
                                <Typography component='h1' variant='h5' onClick={questionCreateHandler}>
                                    Create first question
                                </Typography>
                            </Button>
                    }
                </Grid>
                <Divider orientation='vertical' flexItem light/>
                <Grid
                    item
                    xs={3}
                >
                    {
                        state.selected >= 0
                            ? <QuestionSettings/>
                            :
                            <Grid container justify='center' alignContent='center' className={classes.takeAllSpace}>
                                <Typography
                                    component='h2'
                                    variant='h6'
                                    color='textSecondary'
                                >
                                    Question settings
                                </Typography>
                            </Grid>
                    }

                </Grid>
            </Grid>
        </Grid>
    )
}


const mapStateToProps = state => ({
    state: state.Creator,
})
const mapDispatchToProps = {
    createQuestion,
    setSelected,
    updateQuestionsList,
    updateAnswers,
}

export default connect(mapStateToProps, mapDispatchToProps)(Creator)
