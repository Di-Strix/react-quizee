import ScopedCssBaseline from '@mui/material/ScopedCssBaseline'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import LangSelector from './LangSelector'
import { ThemeProvider } from '@mui/styles'
import { createTheme } from '@mui/material'
import { FirebaseContextProvider } from 'Context/Firebase/Firebase'

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : compose
  )
)

const theme = createTheme({})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <FirebaseContextProvider>
        <FooterContextProvider>
          <ScopedCssBaseline>
            <ThemeProvider theme={theme}>
              <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <BrowserRouter>
                  <Routes>
                    <Route
                      path='/:langCode/*'
                      element={
                        <LangSelector>
                          <Routes>
                            <Route path='Viewer' element={<Viewer />} />
                            <Route path='Creator' element={<Creator />} />
                            <Route path='' element={<HomeScreen />} />
                          </Routes>
                        </LangSelector>
                      }
                    />
                    <Route path='/' exact element={<LangSelector />} />
                  </Routes>
                </BrowserRouter>
              </SnackbarProvider>
            </ThemeProvider>
          </ScopedCssBaseline>
        </FooterContextProvider>
      </FirebaseContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
