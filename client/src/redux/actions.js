import { SPECIFICATION, ADDRESULT, LOADINGSTART, LOADINGEND, REMOVERESULT, GETQUEUE } from './types'

const loadingStart = () => ({type: LOADINGSTART})
const loadingEnd = () => ({type: LOADINGEND})

const addSpecification = specification => {
    return dispatch => {
        dispatch({type: SPECIFICATION, payload: specification})
    }
}

const addResult = command => {
    return dispatch => {
        dispatch({type: ADDRESULT, payload: command})
    }
}

const addQueue = queue => {
    return dispatch => {
        dispatch({type: GETQUEUE, payload: queue})
    }
}


export const removeResult = () => ({type: REMOVERESULT})

export const getQueue = () => {
    return async dispatch => {
        try {
            dispatch(loadingStart())
            const response = await fetch('http://localhost:5000/api/command/queue')
            const queue = await response.json()
            dispatch(addQueue(queue))
            dispatch(loadingEnd())
        } catch (e) {
            dispatch(loadingEnd())
            dispatch(addQueue(null))
        }
    }
}

export const commandFetch = (command) => {
    return async dispatch => {
        try {
            dispatch(loadingStart())

            const response = await fetch('http://localhost:5000/api/command/run', {
                method: 'POST',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(command) // body data type must match "Content-Type" header
            })
            const commandResult = await response.json()
            dispatch(addResult(commandResult))
            dispatch(loadingEnd())
        } catch (e) {
            dispatch(loadingEnd())
            dispatch(addResult(null))
        }
    }
}

export const getSpecification = () => {
    return async dispatch => {
        try {
            dispatch(loadingStart())
            const response = await fetch('http://localhost:5000/api/command/config')
            const data = await response.json()
            dispatch(addSpecification(data))
            dispatch(loadingEnd())
        } catch (e) {
            console.log(e)
            dispatch(loadingEnd())
            dispatch(addSpecification(null))
        }
    }
}