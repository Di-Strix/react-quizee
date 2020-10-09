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
    Container,
    Fab,
    useScrollTrigger,
    Slide,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import { connect } from 'react-redux'
import { fetchQuizees, showQuizees } from 'redux/Home/actions'
import { setQuizeeID, setText } from 'redux/Viewer/actions'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
        Width: '100vw',
    },
    content: {
        marginTop: theme.spacing(2),
    },
    card: {
        width: 275,
        maxHeight: 374,
    },
    cardMargin: {
        margin: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    stickyFab: {
        position: 'sticky',
        alignSelf: 'flex-end',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        margin: theme.spacing(2),
    },
    gutterBottom: {
        marginBottom: theme.spacing(2),
    },
}))

const HomeScreen = ({ state, fetchQuizees, showQuizees, setQuizeeID, setViewerText, dictionary }) => {
    const classes = useStyles()
    const history = useHistory()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const startFetchingQuizees = useCallback(() => {
        fetchQuizees()

        axios.get(process.env.REACT_APP_QUIZEE_API_URL + 'getQuizeesList', { timeout: 5000 })
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
                const snackbarKey = enqueueSnackbar(dictionary.errors.FETCH_ERROR, {
                    variant: 'error',
                    persist: true,
                })
                setTimeout(() => {
                    closeSnackbar(snackbarKey)
                    startFetchingQuizees()
                }, 3000)
            })
    }, [fetchQuizees, showQuizees, enqueueSnackbar, closeSnackbar, dictionary])

    useEffect(() => {
        startFetchingQuizees()
    }, [startFetchingQuizees])

    const clickHandler = useCallback((id, caption) => {
        setQuizeeID(id)
        setViewerText(caption)
        history.push('/Viewer')
    }, [history, setQuizeeID, setViewerText])

    return (
        <Grid
            className={classes.root}
            container
            direction='column'
        >
            <HideOnScroll>
                <AppBar position='sticky' className={classes.gutterBottom}>
                    <Toolbar>
                        <Typography variant='h5' component='h1'>Quizee APP</Typography>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Box maxWidth='lg' style={{ flexGrow: 1 }}>

                <Container maxWidth='lg'>
                    <Grid
                        container
                        direction='row'
                        justify='center'
                    >
                        {
                            state.loading
                                ? <CircularProgress />
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
                                                    {''.concat(dictionary.quizeeCard.QUESTIONS_COUNT, quizee.questionsCount)}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size='small'
                                                    onClick={() => clickHandler(quizee.id, quizee.caption)}>
                                                    {dictionary.quizeeCard.START_TEST}
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))
                        }
                    </Grid>
                </Container>

            </Box>
            <div className={classes.stickyFab}>
                <Fab color="primary" aria-label="add" onClick={() => history.push('/Creator')}>
                    <EditIcon />
                </Fab>
            </div>
        </Grid>
    )
}

function HideOnScroll(props) {
    const { children } = props
    const trigger = useScrollTrigger()

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    )
}

const mapStateToProps = state => ({
    state: state.Home,
    dictionary: state.Global.dictionary.Home
})

const mapDispatchToProps = {
    fetchQuizees,
    showQuizees,
    setQuizeeID,
    setViewerText: setText,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
