import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import * as LANG_TYPES from 'Localization/LangTypes'
import { setLanguage } from 'redux/Global/actions'
import { CircularProgress } from '@mui/material'

const LangSelector = ({ state, children, setLanguage }) => {
  const { langCode } = useParams()
  const gotoPath = useGotoPath()

  useEffect(() => {
    if (state.lang === langCode) return

    const processPreferedLanguagesList = () => {
      let newLangCode

      navigator.languages.every(code => (LANG_TYPES[code] ? !Boolean((newLangCode = code)) : true))

      return newLangCode
    }

    const newLangCode = LANG_TYPES[langCode] ? langCode : processPreferedLanguagesList() || 'en'

    console.log(navigator.languages)
    setLanguage(newLangCode)
    gotoPath(undefined, newLangCode)
    //eslint-disable-next-line
  }, [langCode])

  if (state.lang !== langCode) {
    return <CircularProgress />
  }

  return children
}

const mapStateToProps = state => ({
  state: state.Global,
})

const mapDispatchToProps = {
  setLanguage,
}

export default connect(mapStateToProps, mapDispatchToProps)(LangSelector)

export const useGotoPath = () => {
    const langCodeDefault = useSelector(mapStateToProps).state.lang
    const navigate = useNavigate()
    return (path = '', langCode) => {
        navigate(`/${langCode || langCodeDefault}/${path.startsWith('/') ? path.slice(1) : path}`)
    }
}
