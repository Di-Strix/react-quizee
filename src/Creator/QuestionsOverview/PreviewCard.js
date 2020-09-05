import React, { useState } from 'react'
import { createMuiTheme, Grid, Paper, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { setSelected } from 'redux/Creator/actions'
import { connect } from 'react-redux'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles(theme => ({
    selected: {
        border: '1px solid blue',
        borderRadius: theme.shape.borderRadius,
    },
    takeAllSpace: {
        height: '100%',
        width: '100%',
    },
    removeButton: {
        position: 'absolute',
        bottom: theme.spacing(1.5),
        right: theme.spacing(1.5),
        transition: 'color .15s',
    },
    disabledColor: {
        color: theme.palette.action.disabled,
    },
}))

function PreviewCard({index, style, setSelected = () => {}, onRemove = () => {}, state}) {
    const classes = useStyles()
    const theme = createMuiTheme()
    const [buttonHover, setButtonHover] = useState(false)

    const rootStyles = {...style, height: style.height + theme.spacing(1)} // increasing div's height to make gutter bottom
    rootStyles.top = style.top + theme.spacing(index + 1) // calculating position height of card with spacing

    return (
        <div style={rootStyles}>
            <Paper
                style={{
                    height: style.height,
                    width: `calc(${style.width} - ${theme.spacing(2)}px)`,
                    margin: '0 auto',
                    zIndex: 0,
                }}
            >
                <IconButton
                    className={[classes.removeButton, buttonHover ? '' : classes.disabledColor].join(' ')}
                    disableRipple
                    size={'small'}
                    onPointerEnter={() => setButtonHover(true)}
                    onPointerLeave={() => setButtonHover(false)}
                    color={buttonHover ? 'secondary' : ''}
                    onClick={() => onRemove(index)}
                >
                    <DeleteIcon/>
                </IconButton>
                <Grid
                    container
                    className={[classes.takeAllSpace, state.selected === index ? classes.selected : ''].join(' ')}
                    direction='column'
                    justify='center'
                    onClick={() => setSelected(index)}
                >
                </Grid>
            </Paper>
        </div>
    )
}

const mapStateToProps = state => ({
    state: state.Creator,
})
const mapDispatchToProps = {
    setSelected,
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewCard)
