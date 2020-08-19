import React, { useEffect } from 'react'
import AnswerHandlerContext from '../../../Context/AnswerHandlerContext'
import {
    makeStyles,
    Grid,
} from '@material-ui/core';
import Caption from '../Layout/Caption/Caption';
import ButtonGrid from '../Layout/ButtonGrid/ButtonGrid'
import { setFooterButtonState } from 'redux/Viewer/actions'
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
    },

}));

function OneTrue({ caption, answerOptions, setFooterButtonState, footerActive }) {
    const answerHandler = React.useContext(AnswerHandlerContext)
    const classes = useStyles()

    useEffect(() => {
        if (footerActive)
            setFooterButtonState(false)
        return () => { }
    }, [footerActive, setFooterButtonState])

    return (
        <Grid
            container
            direction='column'
            className={classes.root}
        >
            <Caption>{caption}</Caption>
            <ButtonGrid answerOptions={answerOptions} handler={answerHandler} />
        </Grid >
    )
}

const mapStateToProps = state => ({
    footerActive: state.Viewer.footerButtonActive
})

const mapDispatchToProps = {
    setFooterButtonState
}

export default connect(mapStateToProps, mapDispatchToProps)(OneTrue)