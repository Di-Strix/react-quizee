import React, { useContext } from 'react'
import { makeStyles, Button, Grid, Container, Zoom } from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton'
import { screenChangeTransitionTime } from 'Viewer/constants'
import IsConstructorMode from 'Viewer/Context/IsConstructorModeContext'
import AutoSizer from 'react-virtualized-auto-sizer'

const useStyles = makeStyles(theme => ({
    buttonsHolder: {
        margin: theme.spacing(2),
    },
    button: {
        width: '100%',
        height: '100%',
        padding: theme.spacing(2),
        textTransform: 'none',
        color: theme.palette.text.primary,
    },
}))

const ButtonGrid = ({
                        answerOptions = [],
                        toggle = false,
                        handler = () => { },
                        props = {},
                        inTransitionDelay = screenChangeTransitionTime,
                        buttonTransitionDelay = 100,
                        selected = [],
                    }) => {

    let ButtonAnim = Zoom

    if (useContext(IsConstructorMode)) {
        ButtonAnim = ({children}) => children
    }

    const classes = useStyles()
    const defaultProps = {
        className: classes.button,
        variant: 'contained',
        color: 'default',
    }

    let ButtonNode = <></>
    let additionalProps = () => ({})

    if (toggle) {
        ButtonNode = ToggleButton
        additionalProps = (id, text) => {
            return {
                onChange: () => handler(id, text),
                selected: selected[id] || false,
                value: id,
                // size: 'large',
                ...props,
            }
        }
    } else {
        ButtonNode = Button
        additionalProps = (id, text) => ({
            onClick: () => handler(id, text),
            ...props,
        })

    }
    return (
        <div style={{flexGrow: 1}}>
            <AutoSizer>
                {({height, width}) => (
                    <Grid
                        container
                        direction='row'
                        justify='center'
                        style={{width, height, overflowY: 'auto'}}
                    >
                        <Container maxWidth='lg' style={{width, height}}>
                            <Grid
                                container
                                alignItems='flex-end'
                                alignContent='flex-end'
                                justify='center'
                                style={{height: '100%'}}
                            >
                                {answerOptions.map((answerOption, index) =>
                                    <Grid
                                        item
                                        key={answerOption.id}
                                        xs={12}
                                        sm={3}
                                        className={classes.buttonsHolder}
                                    >
                                        <ButtonAnim in={true}
                                                    style={{transitionDelay: inTransitionDelay + index * buttonTransitionDelay}}>
                                            <div>
                                                <ButtonNode
                                                    {...defaultProps}
                                                    {...additionalProps(answerOption.id, answerOption.val)}
                                                >
                                                    {answerOption.val}
                                                </ButtonNode>
                                            </div>
                                        </ButtonAnim>
                                    </Grid>,
                                )}
                            </Grid>
                        </Container>
                    </Grid>
                )}
            </AutoSizer>
        </div>
    )
}

export default ButtonGrid
