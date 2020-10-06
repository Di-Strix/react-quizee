import React from 'react'
import { Grid, Typography, Paper, Tooltip, makeStyles } from '@material-ui/core'
import ErrorIcon from '@material-ui/icons/Error'

const useStyles = makeStyles(theme => ({
    marginBottom: {
        marginBottom: theme.spacing(2),
    },
    section: {
        padding: theme.spacing(1.6),
    },
    marginLeft: {
        marginLeft: theme.spacing(1),
    },
    gutterBottom: {
        marginBottom: theme.spacing(1)
    }
}))

export default ({ heading, children, showError, errorMessage, AdditionalAction }) => {
    const classes = useStyles()

    return (
        <Grid className={classes.marginBottom}>
            <Typography variant='h6' gutterBottom={!AdditionalAction} style={{ width: '100%' }}>
                <Grid container alignItems='center' >
                    {heading}
                    {
                        showError &&
                        <Tooltip title={<Typography variant='subtitle2'>{errorMessage}</Typography>}>
                            <ErrorIcon className={classes.marginLeft} color='error' />
                        </Tooltip>
                    }
                    <div style={{ flexGrow: 1 }}></div>
                    {AdditionalAction}
                </Grid>
            </Typography>
            <Paper className={classes.section}>
                {children}
            </Paper>
        </Grid >
    )
}