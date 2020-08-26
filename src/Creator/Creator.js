import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { Grid, makeStyles, Divider, Typography, Button } from '@material-ui/core'
import Viewer from '../Viewer/Viewer'
import QuestionsOverview from './QuestionsOverview/QuestionsOverview'
import { createQuestion, setSelected } from 'redux/Creator/actions'
import QuestionSettings from './QuestionSettings/QuestionSettings'

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        overflow: 'hidden',
        flexWrap: 'nowrap',
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

const Creator = ({state, createQuestion, setSelected}) => {
    const classes = useStyles()

    const onCreateQuestion = useCallback(() => {
        createQuestion()
    }, [createQuestion])

    return (
        <Grid
            container
            direction='row'
            className={classes.root}
        >
            <Grid
                container
                item
                xs={2}
                direction='column'
                justify='center'
                className={classes.noWrap}
            >
                <QuestionsOverview onAdd={onCreateQuestion}/>
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
                            <Typography component='h1' variant='h5' onClick={onCreateQuestion}>
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
                        : <Grid container justify='center' alignContent='center' className={classes.takeAllSpace}>
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
    )
}


const mapStateToProps = state => ({
    state: state.Creator,
})
const mapDispatchToProps = {
    createQuestion,
    setSelected,
}

export default connect(mapStateToProps, mapDispatchToProps)(Creator)
