import * as QUESTION_TYPES from 'redux/questionTypes'
import * as ERR_TYPES from 'Creator/errorTypes'

export default {
    Home: {
        quizeeCard: {
            QUESTIONS_COUNT: 'Questions count: ',
            START_TEST: 'Test my brains!'
        },
        errors: {
            FETCH_ERROR: 'Fetching error. 3 seconds timeout'
        }
    },
    Creator: {
        CREATE_FIRST_QUESTION: 'Create first question',
        PUBLISH_QUIZEE: 'Publish',
        ALL_CHECKS_PASSED_PUBLISHING: 'All checks passed, publishing...',
        PUBLISHED_SUCCESSFULLY: 'Published successfully!',
        EXIT_CONFIRM: 'You have unsaved data that will be lost if you leave the page.',
        sections: {
            QuestionSettings: {
                PLACEHOLDER: 'Question settings',
                QUESTION_CAPTION: 'Question caption',
                QUESTION_TYPE: 'Question type',
                questionTypes: {
                    [QUESTION_TYPES.ONE_TRUE]: {
                        TYPE_NAME: 'One True',
                        SECTION_HEADING: 'Answer options',
                    },
                    [QUESTION_TYPES.SEVERAL_TRUE]: {
                        TYPE_NAME: 'Several true',
                        SECTION_HEADING: 'Answer options',
                    },
                    [QUESTION_TYPES.WRITE_ANSWER]: {
                        TYPE_NAME: 'Write answer',
                        SECTION_HEADING: 'Answer',
                    },
                },
            },
            QuestionsOverview: {
                QUIZEE_CAPTION: 'Quizee caption'
            },
        },
        errors: {
            ERR_QUESTIONS_ARE_HAVING_ERRORS: 'Errors was detected in questions. Fix them to publish quizee',
            ERR_QUIZEE_CAPTION_EMPTY: 'Quizee caption can\'t be empty string',
            ERR_QUIZEE_TO_FEW_QUESTIONS: 'Quizee must contain at least one question',
            [ERR_TYPES.ERR_QUESTION_CAPTION_EMPTY]: 'Question caption can\'t be empty string',
            [ERR_TYPES.ERR_QUESTION_UNKNOWN_TYPE]: 'Question has unknown to us type. Try to choose one from existing',
            [ERR_TYPES.ERR_QUESTION_INVALID_CONFIG_TYPE]: 'Question has invalid question config data type. Try to switch question type by choosing another and then return to the current one',
            [ERR_TYPES.ERR_QUESTION_ANSWER_OPTION_INVALID_ID]: 'Some of answer option has invalid ID. Try to remove and add it again. Index of option: {DATA}',
            [ERR_TYPES.ERR_QUESTION_ANSWER_OPTION_EMPTY]: 'Answer option cannot be empty string. Option index: {DATA}',
            [ERR_TYPES.ERR_QUESTION_ANSWER_INVALID_TYPE]: 'Question has invalid answer data type. Try to switch question type by choosing another and then return to the current one',
            [ERR_TYPES.ERR_QUESTION_NO_ANSWER]: 'Question must contain at less one correct answer',
            [ERR_TYPES.ERR_QUESTION_ANSWER_CHILD_INVALID_ID]: 'Answer option under index {DATA} has invalid id. Try to remove it and add again',
            [ERR_TYPES.ERR_QUESTION_ANSWER_EMPTY]: 'The answer to the question can\'t be empty string',
        }
    },
    Viewer: {
        PROCESSING_ANSWERS: 'Please wait, we are processing your answers🎉',
        RESULTS_TEXT: 'Woohoo! You\'ve {DATA}% correct answers!',
        Footer: {
            NEXT_BTN: 'Next'
        },
        components: {
            AnswerField: {
                INPUT_LABEL: 'Write your answer here'
            }
        }
    }
}
