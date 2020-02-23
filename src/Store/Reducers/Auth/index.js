
export const AuthReducer = (state={}, action) => {
    return {
        type : action.type,
        data : action.data
    }
}