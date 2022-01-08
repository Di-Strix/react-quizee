import { createContext } from 'react'
import { initializeApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions'
import { getDatabase, get, ref, child } from 'firebase/database'

export const firebaseContext = createContext(null)

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
}

const app = initializeApp(firebaseConfig)

// eslint-disable-next-line no-restricted-globals
self.FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.NODE_ENV === 'development'
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(process.env.REACT_APP_RE_CAPTCHA_V3_PUBLIC_KEY),
  isTokenAutoRefreshEnabled: true,
})

const cloudFunctions = getFunctions(app)
if (process.env.NODE_ENV === 'development')
  connectFunctionsEmulator(
    cloudFunctions,
    process.env.REACT_APP_FUNCTIONS_EMULATOR_HOST,
    process.env.REACT_APP_FUNCTIONS_EMULATOR_PORT
  )

const functionResultProcessor =
  fn =>
  (...args) =>
    fn(...args).then(res => res.data)

const getQuizeesList = functionResultProcessor(httpsCallable(cloudFunctions, 'getQuizeesList'))
const checkAnswers = functionResultProcessor(httpsCallable(cloudFunctions, 'checkAnswers'))

const fetchQuizeeQuestions = async quizeeId => {
  if (!quizeeId) throw new Error('Empty quizeeId provided')

  const dbRef = ref(getDatabase(app))
  const snapshot = await get(child(dbRef, `/quizees/${quizeeId}/content`))
  if (!snapshot.exists()) throw new Error('No data available')

  return snapshot.val()
}

export const FirebaseContextProvider = ({ children }) => {
  return (
    <firebaseContext.Provider value={{ getQuizeesList, checkAnswers, fetchQuizeeQuestions }}>
      {children}
    </firebaseContext.Provider>
  )
}
