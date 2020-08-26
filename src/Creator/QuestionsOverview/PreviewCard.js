import React from 'react'
import { createMuiTheme, Grid, Paper } from '@material-ui/core'
import Image from 'material-ui-image'
import { makeStyles } from '@material-ui/core/styles'
import { setSelected } from 'redux/Creator/actions'
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
    selected: {
        border: '1px solid blue',
        borderRadius: theme.shape.borderRadius,
    },
    takeAllSpace: {
        height: '100%',
        width: '100%',
    },
}))

function PreviewCard({index, style, setSelected = () => {}, state}) {
    const classes = useStyles()
    const theme = createMuiTheme()
    const aspectRatio = 16 / 9

    const rootStyles = {...style, height: style.height + theme.spacing(1)} // increasing div's height to make gutter bottom
    if (index > 0) rootStyles.top = style.top + theme.spacing(index) // calculating position height of card with spacing

    return (
        <div style={rootStyles}>
            <Paper
                style={{
                    height: style.height,
                    width: `calc(${style.width} - ${theme.spacing(2)}px)`,
                    margin: '0 auto',
                }}
                onClick={() => setSelected(index)}
            >
                <Grid
                    container
                    className={[classes.takeAllSpace, state.selected === index ? classes.selected : ''].join(' ')}
                    direction='column'
                    justify='center'
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
