import {SPECIFICATION, ADDRESULT, LOADINGSTART, LOADINGEND, REMOVERESULT, GETQUEUE} from './types'

const handlers = {
    [ADDRESULT]: ({specification}, action) => {
        return {result: action.payload, specification, loading: false}
    },
    [SPECIFICATION]: ({result}, action) => {
        return {result, specification: action.payload, loading: false}
    },
    [REMOVERESULT]: ({specification}) => {
        return {result: null, specification, loading: false}
    },
    [GETQUEUE]: ({result, specification}, action) => {
      return {result, specification, queue: action.payload, loading: false}
    },
    [LOADINGSTART]: state => ({...state, loading: true}),
    [LOADINGEND]: state => ({...state, loading: false}),
    DEFAULT: state => state
}


const initialState =  {
    result: null,
    specification: null,
    queue: null,
    loading: false
}

export const commandReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}