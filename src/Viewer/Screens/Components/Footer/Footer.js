import React from 'react'
import { AppBar, Toolbar, Button, makeStyles, Container, Grid } from '@material-ui/core'
import ArrowIcon from '@material-ui/icons/ArrowForwardIos'
import { connect } from 'react-redux'
import FooterObserver from 'Viewer/FooterObserver/FooterObserver'
// import './Footer.scss'

const useStyles = makeStyles(theme => ({
    footer: {
        width: '100vw',
        top: 'auto',
        bottom: 0,
    },
    grow: {
        flexGrow: 1,
    },
    offset: theme.mixins.toolbar
}))

function Footer({ active = false, btnRef }) {
    const classes = useStyles()

    return (
        <React.Fragment>
            <AppBar position="absolute" className={classes.footer}>
                <Toolbar>
                    <Container maxWidth='lg'>
                        <Grid container>
                            <div className={classes.grow} />
                            <Button
                                color="inherit"
                                size='large'
                                variant='outlined'
                                endIcon={<ArrowIcon />}
                                onClick={(event) => FooterObserver.emit(event)}
                                disabled={!active}
                                ref={btnRef}
                            >
                                Next
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
})
export default connect(mapStateToProps, null)(Footer)