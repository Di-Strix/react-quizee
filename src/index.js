import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import './index.scss'
import { rootReducer } from './redux/rootReducer'
import * as serviceWorker from './serviceWorker'
import HomeScreen from 'Home/Home'
import Viewer from 'Viewer/Viewer'
import { SnackbarProvider } from 'notistack'
import Creator from './Creator/Creator'
import thunk from 'redux-thunk'
import FooterContextProvider from 'Viewer/Context/Footer/FooterContextProvider'

const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
))

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <FooterContextProvider>
                <ScopedCssBaseline>
                    <SnackbarProvider
                        maxSnack={3}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <BrowserRouter>
                            <Switch>
                                <Route path='/' exact>
                                    <HomeScreen />
                                </Route>
                                <Route path='/Viewer'>
                                    <Viewer />
                                </Route>
                                <Route path='/Creator'>
                                    <Creator />
                                </Route>
                            </Switch>
                        </BrowserRouter>
                    </SnackbarProvider>
                </ScopedCssBaseline>
            </FooterContextProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
