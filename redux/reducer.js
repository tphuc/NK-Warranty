import {SET_QUERY_RESULT, SET_QUERY_PARAMS} from './actions'

const initialState = {
    lastResult: null,
    params: null
}


const History = (state = initialState, action) => {

    switch (action.type) {
        case SET_QUERY_RESULT:
            return {
                ...state,
                lastResult: action.data
            }
        case SET_QUERY_PARAMS:
            return {
                ...state,
                params: action.params
            }
    }
}

export default History;