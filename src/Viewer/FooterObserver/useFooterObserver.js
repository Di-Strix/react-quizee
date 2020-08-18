import { useState } from 'react'
import FooterObserver from './FooterObserver'

export default function (initialState) {
    const [data, setData] = useState(initialState)
    const setState = (state) => { 
        setData(state)
        FooterObserver.setData(state)
    }

    return [data, setState]
}