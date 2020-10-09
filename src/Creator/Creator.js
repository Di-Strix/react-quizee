import React, { useCallback, useState } from 'react'
import { connect } from 'react-redux'
import { Grid, makeStyles, Divider, Typography, Button, AppBar, Toolbar, IconButton } from '@material-ui/core'
import PublishIcon from '@material-ui/icons/Publish'
import HomeIcon from '@material-ui/icons/Home'
import Viewer from '../Viewer/Viewer'
import QuestionsOverview from './QuestionsOverview/QuestionsOverview'
import { createQuestion, setSelected, updateQuestionsList, updateAnswers } from 'redux/Creator/actions'
import QuestionSettings from './QuestionSettings/QuestionSettings'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'
import { checkAnswerOptions, checkQuestions } from './helperFunctions'

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

const Creator = ({ state, createQuestion, setSelected, updateQuestionsList, updateAnswers, dictionary }) => {
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()
    const [published, setPublished] = useState(false)
    const history = useHistory()

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
            throwErrorMessage('Caption cannot be empty')
            return
        }
        if (state.questions.length <= 0) {
            throwErrorMessage('Quizee must contain at least one question')
            return
        }
        const answerCheckSuccess = checkAnswerOptions(state.answers)
        if (!answerCheckSuccess.ok) {
            throwErrorMessage(answerCheckSuccess.message)
            setSelected(answerCheckSuccess.index)
            return
        }

        const questionsCheckSuccess = checkQuestions(state.questions)
        if (!questionsCheckSuccess.ok) {
            throwErrorMessage(questionsCheckSuccess.message)
            setSelected(questionsCheckSuccess.index)
            return
        }

        const dataToPublish = {
            answers: state.answers,
            content: {
                caption: state.caption,
                questions: state.questions,
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
        <Grid
            container
            style={{ width: '100vw', height: '100vh', flexWrap: 'nowrap' }}
            direction='column'
        >
            <AppBar position='static'>
                <Toolbar variant='dense'>
                    <IconButton
                        edge='start'
                        color='inherit'
                        className={classes.homeButton}
                        onClick={() => { history.push('/') }}
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
                    <QuestionsOverview onAdd={questionCreateHandler} onRemove={questionRemoveHandler} />
                </Grid>
                <Divider orientation='vertical' flexItem light />
                <Grid
                    container
                    item
                    justify='center'
                    alignContent='center'
                    xs={7}
                >
                    {
                        state.questions.length > 0
                            ? <Viewer ConstructorMode question={state.questions[state.selected]} />
                            : <Button className={classes.noTextTransform} color='primary' variant='contained'>
                                <Typography component='h1' variant='h5' onClick={questionCreateHandler}>
                                    {dictionary.CREATE_FIRST_QUESTION}
                                </Typography>
                            </Button>
                    }
                </Grid>
                <Divider orientation='vertical' flexItem light />
                <Grid
                    item
                    xs={3}
                >
                    {
                        state.selected >= 0
                            ? <QuestionSettings />
                            :
                            <Grid container justify='center' alignContent='center' className={classes.takeAllSpace}>
                                <Typography
                                    component='h2'
                                    variant='h6'
                                    color='textSecondary'
                                >
                                    {dictionary.sections.QuestionSettings.PLACEHOLDER}
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
    dictionary: state.Global.dictionary.Creator
})
const mapDispatchToProps = {
    createQuestion,
    setSelected,
    updateQuestionsList,
    updateAnswers,
}

export default connect(mapStateToProps, mapDispatchToProps)(Creator)
