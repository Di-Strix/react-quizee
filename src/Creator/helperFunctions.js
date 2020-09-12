export const checkAnswerOptions = (answers) => {
    let errorIndex = -1
    let errorMessage = ''
    const ok = answers.every((answer, index) => {
        const res = checkAnswerOption(answer)
        if (!res.ok) {
            errorMessage = res.message
            errorIndex = index
            return false
        }
        return true
    })

    return {
        index: errorIndex, message: errorMessage, ok,
    }
}

export const checkAnswerOption = answer => {
    let errorMessage = ''
    let ok = true

    if (Array.isArray(answer.answer)) {
        if (answer.answer.length <= 0) {
            errorMessage = 'Answer options should contain at least one option'
            ok = false
        }
    } else if (answer.answer === null) {
        errorMessage = 'Question must contain at least one true answer'
        ok = false
    } else if (typeof answer.answer === 'string' && !answer.answer.trim()) {
        errorMessage = 'Question answer must contain at least one character'
        ok = false
    }
    return {ok, message: errorMessage}
}

export const checkQuestions = questions => {
    let errorIndex = -1
    let errorMessage = ''
    const ok = questions.every((question, index) => {
        const res = checkQuestion(question)
        if (!res.ok) {
            errorMessage = res.message
            errorIndex = index
            return false
        }

        return true
    })
    return {index: errorIndex, message: errorMessage, ok}
}

export const checkQuestion = question => {
    let errorMessage = ''
    let ok = true
    if (!question.caption.trim()) {
        errorMessage = 'Caption cannot be empty'
        ok = false
    }

    if (Array.isArray(question.answerOptions)) {
        const succ = question.answerOptions.every((answer) => answer.id !== null && answer.val.trim())
        if (!succ) {
            errorMessage = 'Answer option cannot be empty'
            ok = false
        }
    }
    return {ok, message: errorMessage}
}
