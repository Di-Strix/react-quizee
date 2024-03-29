import React, { useState } from 'react'
import { useTheme, Grid, Paper, IconButton, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { setSelected } from 'redux/Creator/actions'
import { connect } from 'react-redux'
import * as TYPES from 'redux/questionTypes'
import DeleteIcon from '@mui/icons-material/Delete'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import SeveralTrueIcon from '@mui/icons-material/DoneAll'
import OneTrueIcon from '@mui/icons-material/Done'

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'hidden',
  },
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
    bottom: theme.spacing(1),
    right: theme.spacing(1),
    transition: 'color .15s',
  },
  disabledColor: {
    color: theme.palette.action.disabled,
  },
  cardContent: {
    padding: theme.spacing(2),
  },
}))

function PreviewCard({ index, style, setSelected = () => {}, onRemove = () => {}, state, questions }) {
  const classes = useStyles()
  const theme = useTheme()
  const [buttonHover, setButtonHover] = useState(false)
  const [cardHover, setCardHover] = useState(false)

  const rootStyles = { ...style, height: style.height + +theme.spacing(1).slice(0, -2) } // increasing div's height to make gutter bottom
  rootStyles.top = style.top + +theme.spacing(index + 1).slice(0, -2) // calculating position height of card with spacing

  let PreviewIcon = <></>

  switch (questions[index].type) {
    case TYPES.WRITE_ANSWER:
      PreviewIcon = TextFieldsIcon
      break
    case TYPES.SEVERAL_TRUE:
      PreviewIcon = SeveralTrueIcon
      break
    case TYPES.ONE_TRUE:
      PreviewIcon = OneTrueIcon
      break
    default:
      break
  }

  return (
    <div style={rootStyles}>
      <Paper
        style={{
          height: style.height,
          width: `calc(${style.width} - ${theme.spacing(2)})`,
          margin: '0 auto',
          zIndex: 0,
          overflow: 'hidden',
          position: 'relative',
        }}
        onMouseEnter={() => setCardHover(true)}
        onMouseLeave={() => setCardHover(false)}
        elevation={cardHover ? 3 : 1}
      >
        <IconButton
          className={[classes.removeButton, buttonHover ? '' : classes.disabledColor].join(' ')}
          disableRipple
          size={'small'}
          onPointerEnter={() => setButtonHover(true)}
          onPointerLeave={() => setButtonHover(false)}
          color={buttonHover ? 'secondary' : 'default'}
          onClick={() => onRemove(index)}
        >
          <DeleteIcon />
        </IconButton>
        <Grid
          container
          className={[classes.cardContent, classes.takeAllSpace, state.selected === index ? classes.selected : ''].join(
            ' '
          )}
          direction='column'
          justifyContent='center'
          alignItems='center'
          onClick={() => setSelected(index)}
        >
          <Typography style={{ maxWidth: '100%' }} variant='h6' gutterBottom noWrap>
            {
              questions[index].caption || ' '
              /*not space. alt+255(num). To prevent icon from jumping when empty text*/
            }
          </Typography>
          <PreviewIcon color='primary' fontSize='large' />
        </Grid>
      </Paper>
    </div>
  )
}

const mapStateToProps = state => ({
  state: state.Creator,
  questions: state.Creator.questions,
})
const mapDispatchToProps = {
  setSelected,
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewCard)
