import * as TYPES from './LangTypes'

export default {
    [TYPES.EN]: () => import('./Languages/En'),
    [TYPES.UA]: () => import('./Languages/Ua'),
}