import { Grid } from '@mui/material'
import { withStyles } from '@mui/styles'
import React, { useContext, createContext } from 'react'
import { connect } from 'react-redux'
import { setFooterButtonState } from 'redux/Viewer/actions'
import AnswerHandlerContext from '../../../Context/AnswerHandlerContext'
import AnswerField from '../Layout/AnswerField/AnswerField'
import Caption from '../Layout/Caption/Caption'
import IsConstructorModeContext from 'Viewer/Context/IsConstructorModeContext'
import FooterContext from 'Viewer/Context/Footer/FooterContext'

const multipleContext = createContext()

class WriteAnswer extends React.Component {
  constructor(...props) {
    super(...props)
    this.submitHandler = this.submitHandler.bind(this)
    this.changeHandler = this.changeHandler.bind(this)
    this.state = { value: '', error: '' }
  }

  processInputErrors(val) {
    if (!val.trim()) {
      if (this.props.footerActive) this.props.setFooterButtonState(false)
      return 'Answer should contain at least one character'
    } else {
      if (!this.props.footerActive) this.props.setFooterButtonState(true)
      return ''
    }
  }

  changeHandler(event) {
    const val = event.target.value
    this.setState({ value: val.trimStart(), error: this.processInputErrors(val) })
  }

  submitHandler() {
    const error = this.processInputErrors(this.state.value)
    if (error) return this.setState({ ...this.state, error })

    const answerHandler = this.context.answerHandler
    answerHandler(this.state.value)
  }

  componentDidMount() {
    this.props.setFooterButtonState(false)

    const { subscribe } = this.context.Footer
    subscribe(this.submitHandler)
  }

  componentWillUnmount() {
    const { unSubscribe } = this.context.Footer
    unSubscribe(this.submitHandler)
  }

  render() {
    const { IsConstructorMode, Footer } = this.context
    return (
      <Grid container className={this.props.classes.root} direction='column'>
        <Caption>{this.props.caption}</Caption>
        <AnswerField
          changeHandler={this.changeHandler}
          value={this.state.value}
          submitHandler={Footer.emit}
          error={this.state.error}
          autoFocus={!IsConstructorMode}
        />
      </Grid>
    )
  }
}
WriteAnswer.contextType = multipleContext

const useStyles = () => ({
  root: {
    height: '100%',
  },
})
const mapStateToProps = state => ({
  footerActive: state.Viewer.Footer.active,
})

const mapDispatchToProps = {
  setFooterButtonState,
}

const WriteAnswerConnected = connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(WriteAnswer))

const WithContext = props => {
  const answerHandler = useContext(AnswerHandlerContext)
  const Footer = useContext(FooterContext)
  const IsConstructorMode = useContext(IsConstructorModeContext)

  return (
    <multipleContext.Provider value={{ answerHandler, Footer, IsConstructorMode }}>
      <WriteAnswerConnected {...props} />
    </multipleContext.Provider>
  )
}

export default WithContext
