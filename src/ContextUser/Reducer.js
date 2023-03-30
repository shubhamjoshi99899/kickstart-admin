export default function Reducer(state, action) {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                token: null,
                loading: true,
                error: false,
            };
        case 'LOGIN_SUCCESS':
            return {
                token: action.payload,
                loading: false,
                error: false,
            };
        case 'LOGIN_FAILURE':
            return {
                token: null,
                loading: false,
                error: true,
            };
        case 'LOG_OUT':
            return {
                token: null,
                loading: false,
                error: false,
            };
        default:
            return state;
    }
}
