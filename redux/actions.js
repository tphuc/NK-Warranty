export const SET_QUERY_RESULT = 'SET_QUERY_RESULT'
export const SET_QUERY_PARAMS = 'SET_QUERY_PARAMS'

export const SetQueryResult = (data) => (
    {
        type: SET_QUERY_RESULT,
        data: data
    }
)

export const SetQueryParams = (params) => (
    {
        type: SET_QUERY_PARAMS,
        params: params
    }
)