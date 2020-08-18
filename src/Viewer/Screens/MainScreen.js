import React from 'react'
import OneTrue from './Components/OneTrue/OneTrue'
import WriteAnswer from './Components/WriteAnswer/WriteAnswer'
import FewTrue from './Components/SeveralTrue/SeveralTrue'
import * as TYPES from 'redux/Viewer/types'

export default function MainScreen({ question = {} }) {
    let screen = <></>
    switch (question.type) {
        case TYPES.ONE_TRUE:
            screen = <OneTrue caption={question.caption} answerOptions={question.answerOptions} />
            break;
        case TYPES.SEVERAL_TRUE:
            screen = <FewTrue caption={question.caption} answerOptions={question.answerOptions} />
            break
        case TYPES.WRITE_ANSWER:
            screen = <WriteAnswer caption={question.caption} />
            break
        default:
            return null
    }

    return (
        <React.Fragment>
            {screen}
        </React.Fragment>
    )
}
