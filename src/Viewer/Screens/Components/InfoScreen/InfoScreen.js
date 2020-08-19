import React from 'react'
// import Loader from '../../../../GlobalComponents/Loader/Loader'
import { CircularProgress, makeStyles } from '@material-ui/core'
// import './InfoScreen.scss'
import { Grid } from '@material-ui/core'
import Caption from '../Layout/Caption/Caption'

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
}))
export default function EndTitle({ loading, children }) {
    const classes = useStyles()

    return (
        <Grid
            container
            direction='column'
            className={classes.root}
        >
            <Grid item>
                <Caption>{children}</Caption>
            </Grid>
            {
                loading
                    ? (
                        <Grid item>
                            <CircularProgress />
                        </Grid>
                    )
                    : null
            }
        </Grid>
    )
}