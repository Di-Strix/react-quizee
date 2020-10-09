import * as QUESTION_TYPES from 'redux/questionTypes'

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
        }
    }
}
