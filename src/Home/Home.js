import React, { useEffect, useCallback } from 'react'
import {
    Box,
    Grid,
    makeStyles,
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
    CircularProgress,
    AppBar,
    Toolbar,
    CardMedia,
    Container
} from '@material-ui/core'
import { connect } from 'react-redux'
import { fetchQuizees, showQuizees } from 'redux/Home/actions'
import { setQuizeeID, setText } from 'redux/Viewer/actions'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
        minWidth: '100vw'
    },
    content: {
        marginTop: theme.spacing(2)
    },
    card: {
        width: 275,
        maxHeight: 374
    },
    cardMargin: {
        margin: theme.spacing(2)
    },
    media: {
        height: 0,
        paddingTop: '56.25%' // 16:9
    }
}))

const HomeScreen = ({state, fetchQuizees, showQuizees, setQuizeeID, setViewerText}) => {
    const classes = useStyles()
    const history = useHistory()
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()

    const startFetchingQuizees = useCallback(() => {
        fetchQuizees()

        axios.get(process.env.REACT_APP_QUIZEE_API_URL + 'getQuizeesList', {timeout: 5000})
            .then(res => res.data)
            .then(data => {
                if (data.ok) {
                    return data.message
                } else {
                    throw new Error('something went wrong while fetching')
                }
            })
            .then(list => {
                showQuizees(list)
                console.log(list)
            })
            .catch(err => {
                // console.log(err)
                const snackbarKey = enqueueSnackbar('Fetching error. 3 seconds timeout', {
                    variant: 'error',
                    persist: true
                })
                setTimeout(() => {
                    closeSnackbar(snackbarKey)
                    startFetchingQuizees()
                }, 3000)
            })
    }, [fetchQuizees, showQuizees, enqueueSnackbar, closeSnackbar])

    useEffect(() => {
        startFetchingQuizees()
    }, [startFetchingQuizees])

    const clickHandler = useCallback((id, caption) => {
        setQuizeeID(id)
        setViewerText(caption)
        history.push('/Viewer')
    }, [history, setQuizeeID])

    return (
        <Box maxWidth='lg' className={classes.root}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h5' component='h1'>Quizee APP</Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth='lg'>
                <Grid
                    container
                    direction='row'
                    justify='center'
                    className={classes.content}
                >
                    {
                        state.loading
                            ? <CircularProgress/>
                            : state.quizeeList.map(quizee => (
                                <Grid item className={classes.cardMargin} key={quizee.id}>
                                    <Card className={classes.card}>
                                        <CardMedia
                                            className={classes.media}
                                            image={quizee.img || 'http://placeimg.com/275/155/any'}
                                        />
                                        <CardContent>
                                            <Typography variant='h5' component='h2' gutterBottom>
                                                {quizee.caption}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p" noWrap>
                                                Questions count: {quizee.questionsCount}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size='small' onClick={() => clickHandler(quizee.id, quizee.caption)}>Test my
                                                brains!</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>

                            ))
                    }
                </Grid>
            </Container>
        </Box>
    )
}

const mapStateToProps = state => ({
    state: state.Home
})

const mapDispatchToProps = {
    fetchQuizees,
    showQuizees,
    setQuizeeID,
    setViewerText: setText
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
