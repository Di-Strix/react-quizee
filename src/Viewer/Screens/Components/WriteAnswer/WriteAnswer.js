import { Grid, makeStyles } from '@material-ui/core'
import React, { useEffect, useContext } from 'react'
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

const WriteAnswer = ({ caption, footerActive, setFooterButtonState }) => {
    const answerHandler = React.useContext(AnswerHandlerContext)
    // const classPrefix = 'Quizee__Viewer__WriteAnswer'
    const [state, setState] = useFooterObserver({ value: '', error: '' });
    const classes = useStyles()

    useEffect(() => {
        if (!footerActive)
            setFooterButtonState(true)
        FooterObserver.subscribe(submitHandler)
            return () => { FooterObserver.unSubscribe(submitHandler)}
    }, [])

    function processInputErrors(val) {
        if (!val.trim()) {
            if (footerActive) setFooterButtonState(false)
            return 'Answer should contain at least one character'
        } else {
            if (!footerActive) setFooterButtonState(true)
            return ''
        }
    }

    function changeHandler(event) {
        const val = event.target.value
        setState({ value: val.trimStart(), error: processInputErrors(val) })
    }
    function submitHandler(event, data) {
        event.preventDefault()
        const error = processInputErrors(data.value)
        if(error) return setState({...data, error})
        answerHandler(data.value)
    }

    return (
        <Grid container className={classes.root} direction='column'>
            <Caption>{caption}</Caption>
            <AnswerField changeHandler={changeHandler} value={state.value} submitHandler={(e) => FooterObserver.emit(e)} error={state.error}/>
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
    footerActive: state.Viewer.footerButtonActive
})

const mapDispatchToProps = {
    setFooterButtonState,
}
export default connect(mapStateToProps, mapDispatchToProps)(WriteAnswer)