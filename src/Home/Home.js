import React, { useEffect, useCallback } from 'react'
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
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useGotoPath } from 'LangSelector'
import Card from './Components/Card'

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

  const startFetchingQuizees = useCallback(() => {
    fetchQuizees()

    axios
      .get(process.env.REACT_APP_QUIZEE_API_URL + 'getQuizeesList', { timeout: 5000 })
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
      <Box maxWidth='lg' style={{ flexGrow: 1 }}>
        <Container maxWidth='lg'>
          <Grid container direction='row' justify='center'>
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
