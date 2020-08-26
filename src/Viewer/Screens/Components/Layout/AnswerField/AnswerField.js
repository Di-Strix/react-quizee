import React from 'react'
import { Grid, Container, TextField, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        alignItems: 'center',
    },
    input: {
        width: '100%'
    }
}))

const AnswerField = ({ error = '', changeHandler = () => { }, submitHandler = () => { }, value = '', fieldRef }) => {
    const classes = useStyles()

    return (
        <Grid container className={classes.root}>
            <Container maxWidth='md'>
                <form onSubmit={submitHandler} noValidate>
                    <TextField
                        error={error ? true : false}
                        helperText={error || 'ok'}
                        label='Write your answer here'
                        // InputProps={{ style: { padding: '.6rem' } }}
                        onChange={changeHandler}
                        value={value}
                        className={classes.input}
                        variant='filled'
                        autoFocus
                        ref={fieldRef}
                        size='medium'
                    />
                </form>
            </Container>
        </Grid>
    )
}

export default AnswerField
