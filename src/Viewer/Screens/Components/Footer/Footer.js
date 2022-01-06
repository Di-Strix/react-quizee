import React, { useContext } from 'react'
import { AppBar, Toolbar, Button, makeStyles, Container, Grid } from '@material-ui/core'
import ArrowIcon from '@material-ui/icons/ArrowForwardIos'
import { connect } from 'react-redux'
import FooterContext from 'Viewer/Context/Footer/FooterContext'

const useStyles = makeStyles(theme => ({
  footer: {
    width: '100vw',
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
}))

function Footer({ active = false, btnRef, dictionary }) {
  const classes = useStyles()
  const { emit } = useContext(FooterContext)

  return (
    <React.Fragment>
      <AppBar position='absolute' className={classes.footer}>
        <Toolbar>
          <Container maxWidth='lg'>
            <Grid container>
              <div className={classes.grow} />
              <Button
                color='inherit'
                size='large'
                variant='outlined'
                endIcon={<ArrowIcon />}
                onClick={emit}
                disabled={!active}
                ref={btnRef}
              >
                {dictionary.NEXT_BTN}
              </Button>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  active: state.Viewer.Footer.active,
  dictionary: state.Global.dictionary.Viewer.Footer,
})
export default connect(mapStateToProps, null)(Footer)
