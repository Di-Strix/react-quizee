import React from 'react'
import Context from './FooterContext'

export default class extends React.Component {
  constructor(...props) {
    super(...props)
    this.listeners = []
    this.subscribe = this.subscribe.bind(this)
    this.unSubscribe = this.unSubscribe.bind(this)
    this.emit = this.emit.bind(this)
  }

  subscribe(fn, singleUse = true) {
    if (!fn || typeof fn !== 'function') return

    this.listeners = [
      ...this.listeners,
      {
        fn,
        singleUse,
      },
    ]
  }

  unSubscribe(fn) {
    this.listeners = this.listeners.filter(sub => sub.fn !== fn)
  }

  emit(data) {
    this.listeners = this.listeners.reduce((acc, obj) => {
      obj.fn(data)
      if (!obj.singleUse) acc.push(obj)
      return acc
    }, [])
  }

  render() {
    return (
      <Context.Provider
        value={{
          subscribe: this.subscribe,
          unSubscribe: this.unSubscribe,
          emit: this.emit,
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}
