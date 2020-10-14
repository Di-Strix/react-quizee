import * as QUESTION_TYPES from 'redux/questionTypes'
import * as ERR_TYPES from 'Creator/errorTypes'

export default {
    Home: {
        quizeeCard: {
            QUESTIONS_COUNT: 'Кількість питань: ',
            START_TEST: 'Розпочати тестування!'
        },
        errors: {
            FETCH_ERROR: 'Помилка завантаження. 3 секунди очікування'
        }
    },
    Creator: {
        CREATE_FIRST_QUESTION: 'Створити перше питання',
        PUBLISH_QUIZEE: 'Опублікувати',
        ALL_CHECKS_PASSED_PUBLISHING: 'Всі перевірки пройдені успішно, публікація...',
        PUBLISHED_SUCCESSFULLY: 'Успішно опубліковано!',
        EXIT_CONFIRM: 'Є незбереженні данні, як ви втратите, якщо покините данну сторінку. Ви дійсно бажаєте вийти?',
        sections: {
            QuestionSettings: {
                PLACEHOLDER: 'Параметри питання',
                QUESTION_CAPTION: 'Питання',
                QUESTION_TYPE: 'Тип питання',
                questionTypes: {
                    [QUESTION_TYPES.ONE_TRUE]: {
                        TYPE_NAME: 'Одна правильна відповідь',
                        SECTION_HEADING: 'Варіанти відповідей',
                    },
                    [QUESTION_TYPES.SEVERAL_TRUE]: {
                        TYPE_NAME: 'Декілька правильних відповідей',
                        SECTION_HEADING: 'Варіанти відповідей',
                    },
                    [QUESTION_TYPES.WRITE_ANSWER]: {
                        TYPE_NAME: 'Письмова відповідь',
                        SECTION_HEADING: 'Відповідь',
                    },
                },
            },
            QuestionsOverview: {
                QUIZEE_CAPTION: 'Заголовок quizee'
            },
        },
        errors: {
            ERR_QUESTIONS_ARE_HAVING_ERRORS: 'Були виявлені помилки. Виправте їх, щоб опублікувати quizee',
            ERR_QUIZEE_CAPTION_EMPTY: 'Заголовок quizee не може бути пустою строкою',
            ERR_QUIZEE_TO_FEW_QUESTIONS: 'Quizee повинен містити щонайменше одне питання',
            [ERR_TYPES.ERR_QUESTION_CAPTION_EMPTY]: 'Питання не може бути пустою строкою',
            [ERR_TYPES.ERR_QUESTION_UNKNOWN_TYPE]: 'Питання має невідомий для нас тип. Спробуйте вибрати один з запропонованих',
            [ERR_TYPES.ERR_QUESTION_INVALID_CONFIG_TYPE]: 'Питання має невірний формат конфігурації. Спробуйте змінити тип питання не інший, а потім на поточний',
            [ERR_TYPES.ERR_QUESTION_ANSWER_OPTION_INVALID_ID]: 'Деякі відповіді мають недійсний ID. Спробуйте видалити їх та додати знов. Номер відповіді: {DATA}',
            [ERR_TYPES.ERR_QUESTION_ANSWER_OPTION_EMPTY]: 'Варіант відповіді не може бути пустою строкою. Номер відповіді: {DATA}',
            [ERR_TYPES.ERR_QUESTION_ANSWER_INVALID_TYPE]: 'Питання має недійсний тип данних. Спробуйте змінити тип питання не інший, а потім на поточний',
            [ERR_TYPES.ERR_QUESTION_NO_ANSWER]: 'Питання має містити щонайменше одну правильну відповідь',
            [ERR_TYPES.ERR_QUESTION_ANSWER_CHILD_INVALID_ID]: 'Варіант відповіді під номером {DATA} має недійсний ID. Спробуйте видалити його та додати знов',
            [ERR_TYPES.ERR_QUESTION_ANSWER_EMPTY]: 'Відповідь на питання не може бути пустою строкою',
        }
    },
    Viewer: {
        PROCESSING_ANSWERS: 'Будь ласка, зачекайте, ми перевіряємо ваші відповіді🎉',
        RESULTS_TEXT: 'Юхуу! ви набрали {DATA}% правильних відповідей!',
        Footer: {
            NEXT_BTN: 'Далі'
        },
        components: {
            AnswerField: {
                INPUT_LABEL: 'Впишіть вашу відповідь тут'
            }
        }
    }
}
