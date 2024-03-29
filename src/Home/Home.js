import React, { useEffect, useCallback, useContext } from 'react'
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  AppBar,
  Toolbar,
  Container,
  Fab,
  useScrollTrigger,
  Slide,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import EditIcon from '@mui/icons-material/Edit'
import { connect } from 'react-redux'
import { fetchQuizees, showQuizees } from 'redux/Home/actions'
import { setQuizeeID, setText } from 'redux/Viewer/actions'
import { useSnackbar } from 'notistack'
import { useGotoPath } from 'LangSelector'
import Card from './Components/Card'
import { firebaseContext } from 'Context/Firebase/Firebase'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    width: '100vw',
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
  const gotoPath = useGotoPath()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { getQuizeesList } = useContext(firebaseContext)

  const startFetchingQuizees = useCallback(() => {
    fetchQuizees()

    getQuizeesList()
      .then(list => {
        showQuizees(list)
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
  }, [fetchQuizees, showQuizees, enqueueSnackbar, closeSnackbar, dictionary, getQuizeesList])

  useEffect(() => {
    startFetchingQuizees()
  }, [startFetchingQuizees])

  const clickHandler = useCallback(
    (id, caption) => {
      setQuizeeID(id)
      setViewerText(caption)
      gotoPath('Viewer')
    },
    [gotoPath, setQuizeeID, setViewerText]
  )

  return (
    <Grid className={classes.root} container direction='column'>
      <HideOnScroll>
        <AppBar position='sticky' className={classes.gutterBottom}>
          <Toolbar>
            <Typography variant='h5' component='h1'>
              Quizee APP
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Box maxWidth='lg' style={{ flexGrow: 1 }} alignSelf='center'>
        <Container maxWidth='lg'>
          <Grid container direction='row' justifyContent='center'>
            {state.loading ? (
              <CircularProgress />
            ) : (
              state.quizeeList.map(quizee => (
                <Card key={quizee.id} quizee={quizee} onClick={() => clickHandler(quizee.id, quizee.caption)} />
              ))
            )}
          </Grid>
        </Container>
      </Box>
      <div className={classes.stickyFab}>
        <Fab color='primary' aria-label='add' onClick={() => gotoPath('Creator')}>
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
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  )
}

const mapStateToProps = state => ({
  state: state.Home,
  dictionary: state.Global.dictionary.Home,
})

const mapDispatchToProps = {
  fetchQuizees,
  showQuizees,
  setQuizeeID,
  setViewerText: setText,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
