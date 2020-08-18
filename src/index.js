import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import * as serviceWorker from './serviceWorker'
import Viewer from './Viewer/Viewer'
import { rootReducer } from './redux/rootReducer'
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline'

const store = createStore(rootReducer, compose(
  process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : null
))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ScopedCssBaseline>
        <Viewer quizeeId='-MDtfxU-wQUeZwmD-A2K' />
      </ScopedCssBaseline>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
