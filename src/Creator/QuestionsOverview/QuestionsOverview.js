import React from 'react'
import { makeStyles, Button, Grid, Paper, TextField, createMuiTheme } from '@material-ui/core'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'
import AddIcon from '@material-ui/icons/Add'
import { connect } from 'react-redux'
import PreviewCard from './PreviewCard'

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    margin2: {
        margin: theme.spacing(2),
    },
    cardsMargin: {
        margin: `${theme.spacing(2)}px 0`,
    },
    marginBottom2: {
        marginBottom: theme.spacing(2),
    },
    noWrap: {
        flexWrap: 'nowrap',
    },
    takeAllSpace: {
        height: '100%',
        width: '100%',
    },

    fit: {
        height: 'fit-content',
    },
}))

const QuestionsOverview = ({state, onAdd = () => {}}) => {
    const classes = useStyles()

    return (
        <React.Fragment>
            <Grid item className={classes.margin2}>
                <TextField value={state.caption} fullWidth label='Quizee caption'/>
            </Grid>
            <Grid
                item
                className={[classes.grow, classes.cardsMargin].join(' ')}
            >
                <AutoSizer>
                    {({height, width}) => (
                        <FixedSizeList
                            height={height}
                            itemCount={state.questions.length}
                            itemSize={width / (16 / 9)}
                            width={width}
                        >
                            {(props) => <PreviewCard {...props}/>}
                        </FixedSizeList>
                    )}
                </AutoSizer>
            </Grid>
            <Grid container justify='center' className={classes.marginBottom2}>
                <Grid item xs={12} lg={6}>
                    <Paper variant='outlined'>
                        <Button onClick={onAdd} className={classes.takeAllSpace}><AddIcon/></Button>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    state: state.Creator,
})


export default connect(mapStateToProps, null)(QuestionsOverview)
