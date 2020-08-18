import React from 'react'
import { makeStyles, Grid, Box, Typography, Container } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        minHeight: '20%',
        maxHeight: 'fit-content',
    }
}))

const Caption = ({ children }) => {
    const classes = useStyles()

    if (!children) return null

    return (
        <Grid
            container
            className={classes.header}
        >
            <Container>
                <Box m={2}>
                    <Typography variant='h4' component='h4' >{children}</Typography>
                </Box>
            </Container>
        </Grid>
    )
}

export default Caption