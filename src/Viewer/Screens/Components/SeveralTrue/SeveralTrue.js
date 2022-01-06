import React, { useContext, createContext } from 'react'
import AnswerHandlerContext from '../../../Context/AnswerHandlerContext'
import { Grid, withStyles } from '@material-ui/core'
import ButtonGrid from '../Layout/ButtonGrid/ButtonGrid'
import Caption from '../Layout/Caption/Caption'
import { connect } from 'react-redux'
import { setFooterButtonState } from 'redux/Viewer/actions'
import FooterContext from 'Viewer/Context/Footer/FooterContext'

const MultipleContext = createContext()

class SeveralTrue extends React.Component {
  constructor(...props) {
    super(...props)
    this.requiredAnswerCount = this.props.requiredAnswerCount || 1
    this.submitHandler = this.submitHandler.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
    this.state = {}
  }

  processAnswerCount(obj = {}) {
    const checked = Object.keys(obj).reduce((acc, key) => acc + obj[key], 0)
    if (checked >= this.requiredAnswerCount) {
      if (!this.props.footerActive) this.props.setFooterButtonState(true)
    } else if (this.props.footerActive) this.props.setFooterButtonState(false)

    return checked
  }

  clickHandler(id) {
    const sel = { ...this.state }
    sel[id] = !sel[id]
    this.setState(sel)
    this.processAnswerCount(sel)
  }

  submitHandler() {
    if (this.processAnswerCount(this.state) < this.requiredAnswerCount) return
    const answer = []
    Object.keys(this.state).forEach(key => (this.state[key] ? answer.push(+key) : null))

    const { answerHandler } = this.context
    answerHandler(answer)
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
    return (
      <Grid container className={this.props.classes.root} direction='column'>
        <Caption>{this.props.caption}</Caption>
        <ButtonGrid toggle answerOptions={this.props.answerOptions} handler={this.clickHandler} selected={this.state} />
      </Grid>
    )
  }
}
SeveralTrue.contextType = MultipleContext

const mapStateToProps = state => ({
  footerActive: state.Viewer.Footer.active,
})

const mapDispatchToProps = {
  setFooterButtonState,
}

const styles = () => ({
  root: {
    height: '100%',
  },
})

const SeveralTrueConnected = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SeveralTrue))

const WithContext = props => {
  const answerHandler = useContext(AnswerHandlerContext)
  const Footer = useContext(FooterContext)

  return (
    <MultipleContext.Provider
      value={{
        answerHandler,
        Footer,
      }}
    >
      <SeveralTrueConnected {...props} />
    </MultipleContext.Provider>
  )
}

export default WithContext
