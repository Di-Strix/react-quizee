import React, { useState, useEffect, useMemo, useCallback } from 'react'
import AnswerHandlerContext from '../../../Context/AnswerHandlerContext'
// import './SeveralTrue.scss'
import { Grid, makeStyles } from '@material-ui/core'
import ButtonGrid from '../Layout/ButtonGrid/ButtonGrid'
import Caption from '../Layout/Caption/Caption'
import { connect } from 'react-redux'
import { setFooterButtonState } from 'redux/Viewer/actions'
import FooterObserver from 'Viewer/FooterObserver/FooterObserver'
import useFooterObserver from 'Viewer/FooterObserver/useFooterObserver'

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%'
    },
}))

const SeveralTrue = ({ caption, answerOptions, requiredAnswerCount = 1, footerActive, setFooterButtonState }) => {
    const answerHandler = React.useContext(AnswerHandlerContext)
    const [selected, setSelected] = useFooterObserver(Array(answerOptions.length).fill(false))
    const classes = useStyles()

    useEffect(() => {
        if (footerActive) setFooterButtonState(false)
        FooterObserver.subscribe(submitHandler)
        return () => FooterObserver.unSubscribe(submitHandler)
    }, [])

    useEffect(() => console.log(selected), [selected])

    function processAnswerCount(arr = []) {
        const checked = arr.reduce((acc, val) => acc + val, 0)
        if (checked >= requiredAnswerCount) {
            if (!footerActive) setFooterButtonState(true)
        } else if (footerActive) setFooterButtonState(false)
    }

    function clickHandler(_, index) {
        const sel = [...selected]
        sel[index] = !sel[index]
        setSelected(sel)
        processAnswerCount(sel)
    }

    function submitHandler(event, data) {
        if (data.length <= requiredAnswerCount) return
        const answer = []
        data.forEach((selected, index) => selected ? answer.push(answerOptions[index]) : null)
        debugger
        answerHandler(answer)
    }

    return (
        <Grid container className={classes.root}>
            <Caption>{caption}</Caption>
            <ButtonGrid toggle answerOptions={answerOptions} checked={selected} handler={clickHandler} selected={selected} />
        </Grid>
        //     <h1 className={classPrefix + '__question'}>{caption}</h1>
        //     <div className={classPrefix + '__buttons'}>
        //         {
        //             answerOptions.map((text, index) => (
        //                 <button
        //                     onClick={clickHandler.bind(null, index)}
        //                     key={index}
        //                     className={selected[index] ? 'selected' : ''}
        //                 >
        //                     <input type='checkbox' checked={selected[index] ? true : false} readOnly={true} />
        //                     <span>{text}</span>
        //                 </button>
        //             ))
        //         }
        //     </div>
        //     <Footer btnRef={nextBtnRef} clickHandler={submitHandler} />
        // </div>
    )
}

const mapStateToProps = state => ({
    footerActive: state.Viewer.Footer.active
})

const mapDispatchToProps = {
    setFooterButtonState
}

export default connect(mapStateToProps, mapDispatchToProps)(SeveralTrue)