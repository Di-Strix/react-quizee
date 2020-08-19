import React from 'react'
import { makeStyles, Button, Grid, Container, Zoom } from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton'
import { screenChangeTransitionTime } from 'Viewer/constants'

const useStyles = makeStyles(theme => ({
    buttonsGridContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        marginBottom: theme.spacing(1),
    },
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
    selected = []
}) => {

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
        additionalProps = (text, index) => {
            return {
                onChange: () => handler(text, index),
                selected: selected[index] || false,
                value: index,
                // size: 'large',
                ...props,
            }
        }
    } else {
        ButtonNode = Button
        additionalProps = (text, index) => ({
            onClick: () => handler(text, index),
            ...props,
        })

    }
    return (
        <Grid
            container
            className={classes.buttonsGridContainer}
            direction='column'
        >
            <Container maxWidth='lg'>
                <Grid
                    container
                    justify='center'
                >
                    {answerOptions.map((text, index) =>
                        <Grid
                            item
                            key={index}
                            xs={12}
                            sm={3}
                            className={classes.buttonsHolder}
                        >
                            <Zoom in={true} style={{ transitionDelay: inTransitionDelay + index * buttonTransitionDelay }}>
                                <div>
                                    <ButtonNode
                                        {...defaultProps}
                                        {...additionalProps(text, index)}
                                    >
                                        {text}
                                    </ButtonNode>
                                </div>
                            </Zoom>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </Grid>
    )
}

export default ButtonGrid