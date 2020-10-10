import React, { useEffect } from 'react'
import { Grid, Container, TextField, makeStyles } from '@material-ui/core'
import { screenChangeTransitionTime } from 'Viewer/constants'
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        alignItems: 'center',
    },
    input: {
        width: '100%',
    },
}))

const AnswerField = ({ error = '', changeHandler = () => { }, submitHandler = () => { }, value = '', autoFocus = false, dictionary }) => {
    const classes = useStyles()
    const fieldRef = React.useRef(null)

    useEffect(() => {
        if (autoFocus) {
            setTimeout(() => {
                fieldRef.current.focus()
            }, screenChangeTransitionTime)
        }
        //eslint-disable-next-line
    }, [])

    return (
        <Grid container className={classes.root}>
            <Container maxWidth='md'>
                <form onSubmit={e => e.preventDefault() || submitHandler(e)} noValidate>
                    <TextField
                        error={!!error}
                        helperText={error || ' '}
                        label={dictionary.INPUT_LABEL}
                        onChange={changeHandler}
                        value={value}
                        className={classes.input}
                        variant='filled'
                        inputRef={fieldRef}
                        size='medium'
                    />
                </form>
            </Container>
        </Grid>
    )
}

const mapStateToProps = state => ({
    dictionary: state.Global.dictionary.Viewer.components.AnswerField
})

export default connect(mapStateToProps)(AnswerField)
