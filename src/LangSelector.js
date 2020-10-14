import React, { useEffect } from 'react'
import { useParams, Redirect, useHistory } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import * as LANG_TYPES from 'Localization/LangTypes'
import { setLanguage } from 'redux/Global/actions'
import { CircularProgress } from '@material-ui/core'

const LangSelector = ({ state, children, setLanguage }) => {
    const { langCode = 'en' } = useParams()

    useEffect(() => {
        setLanguage(langCode)
        //eslint-disable-next-line
    }, [langCode])

    if (!LANG_TYPES[langCode.toUpperCase()]) {
        return <Redirect to='/en/' />
    }
    if (state.lang !== langCode.toUpperCase()) {
        return <CircularProgress />
    }
    return children
}

const mapStateToProps = state => ({
    state: state.Global
})

const mapDispatchToProps = {
    setLanguage
}

export default connect(mapStateToProps, mapDispatchToProps)(LangSelector)

export const useGotoPath = () => {
    const langCode = useSelector(mapStateToProps).state.lang.toLowerCase()
    const history = useHistory()
    return (path = '') => {
        history.push(`/${langCode}/${path}`)
    }
}