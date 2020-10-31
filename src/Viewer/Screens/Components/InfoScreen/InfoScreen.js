import React from 'react'
import { CircularProgress, makeStyles } from '@material-ui/core'
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
export default function InfoScreen({ loading, caption, children }) {
    const classes = useStyles()

    return (
        <Grid
            container
            direction='column'
            className={classes.root}
        >
            <Grid item>
                <Caption>{caption}</Caption>
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
            <Grid item>
                {children}
            </Grid>
        </Grid>
    )
}