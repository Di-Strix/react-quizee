import React, { useCallback, useState } from 'react'
import { makeStyles, Button, Grid, Paper, TextField, debounce } from '@material-ui/core'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'
import AddIcon from '@material-ui/icons/Add'
import { connect } from 'react-redux'
import PreviewCard from './PreviewCard'
import { updateQuizeeCaption } from 'redux/Creator/actions'

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
    innerShadow: {
        boxShadow: 'inset 0px 11px 8px -10px #ccc, inset 0px -11px 8px -10px #ccc;',
    },
}))

const QuestionsOverview = ({ state, onAdd = () => { }, onRemove = () => { }, updateQuizeeCaption }) => {
    const classes = useStyles()
    const [caption, setCaption] = useState(() => state.caption)

    const dispatchToStore = useCallback(
        debounce(val => {
            updateQuizeeCaption(val)
        }, 300),
        [updateQuizeeCaption])

    const setCaptionWithDispatch = useCallback(val => {
        setCaption(val)
        dispatchToStore(val)
    }, [dispatchToStore, setCaption])

    return (
        <React.Fragment>
            <Grid item className={classes.margin2}>
                <TextField value={caption}
                    onChange={e => setCaptionWithDispatch(e.target.value)}
                    fullWidth
                    error={state.caption.length <= 0}
                    label='Quizee caption' />
            </Grid>
            <Grid
                item
                className={[classes.grow, classes.cardsMargin].join(' ')}
            >
                <AutoSizer>
                    {({ height, width }) => (
                        <React.Fragment>
                            <div className={classes.innerShadow} style={{
                                height: height,
                                width: width,
                                position: 'absolute',
                                zIndex: 100,
                                pointerEvents: 'none',
                            }}></div>
                            <FixedSizeList
                                height={height}
                                itemCount={state.questions.length}
                                itemSize={width / (16 / 9)}
                                width={width}
                            >
                                {(props) => <PreviewCard {...props} onRemove={onRemove} />}
                            </FixedSizeList>
                        </React.Fragment>
                    )}
                </AutoSizer>
            </Grid>
            <Grid container justify='center' className={classes.marginBottom2}>
                <Grid item xs={12} lg={6}>
                    <Paper variant='outlined'>
                        <Button onClick={onAdd} className={classes.takeAllSpace}><AddIcon /></Button>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    state: state.Creator,
})
const mapDispatchToProps = {
    updateQuizeeCaption,
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsOverview)
