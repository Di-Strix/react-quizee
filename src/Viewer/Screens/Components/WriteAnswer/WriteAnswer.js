import { Grid, makeStyles } from '@material-ui/core'
import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { setFooterButtonState } from 'redux/Viewer/actions'
import AnswerHandlerContext from '../../../Context/AnswerHandlerContext'
import AnswerField from '../Layout/AnswerField/AnswerField'
import Caption from '../Layout/Caption/Caption'
import FooterObserver from 'Viewer/FooterObserver/FooterObserver'
import useFooterObserver from 'Viewer/FooterObserver/useFooterObserver'

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%'
    }
}))

const initialState = { value: '', error: '' }

const WriteAnswer = ({ caption, setFooterButtonState, footerActive }) => {
    const answerHandler = React.useContext(AnswerHandlerContext)
    // const classPrefix = 'Quizee__Viewer__WriteAnswer'
    const [state, setState] = useFooterObserver(initialState);
    const classes = useStyles()

    const processInputErrors = useCallback((val) => {
        // debugger
        if (!val.trim()) {
            if (footerActive) setFooterButtonState(false)
            return 'Answer should contain at least one character'
        } else {
            if (!footerActive) setFooterButtonState(true)
            return ''
        }
    }, [setFooterButtonState, footerActive])

    function changeHandler(event) {
        // debugger
        const val = event.target.value
        setState({ value: val.trimStart(), error: processInputErrors(val) })
    }

    const submitHandler = useCallback((event, data) => {
        // debugger
        if (!data) data = initialState
        event.preventDefault()
        const error = processInputErrors(data.value)
        if (error) return setState({ ...data, error })
        answerHandler(data.value)
    }, [answerHandler, processInputErrors, setState])

    useEffect(() => {
        setFooterButtonState(false)
    }, [setFooterButtonState])

    useEffect(() => {
        FooterObserver.subscribe(submitHandler)
        return () => { FooterObserver.unSubscribe(submitHandler) }
        // eslint-disable-next-line
    }, [])


    return (
        <Grid container className={classes.root} direction='column'>
            <Caption>{caption}</Caption>
            <AnswerField changeHandler={changeHandler} value={state.value} submitHandler={(e) => FooterObserver.emit(e)} error={state.error} />
            {/* <form
                    className='input-field'
                    onSubmit={submitHandler}
                >
                    <input
                        className='validate'
                        value={value}
                        onChange={changeHandler}
                        type='text"'
                        autoFocus={true}
                        autoComplete='off'
                        id='answer_field'
                    />
                    <label for='answer_field'>Type your answer here</label>
                </form> */}
        </Grid>
    )
}

const mapStateToProps = state => ({
    footerActive: state.Viewer.Footer.active
})

const mapDispatchToProps = {
    setFooterButtonState,
}
export default connect(mapStateToProps, mapDispatchToProps)(WriteAnswer)
