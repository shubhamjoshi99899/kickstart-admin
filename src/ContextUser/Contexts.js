/* eslint-disable camelcase */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect, useReducer } from 'react';
import Reducer from './Reducer';

const isServer = typeof window !== 'undefined';

const initial_state = {
    token: JSON.parse(localStorage.getItem('token') || null),
    loading: false,
    error: false,
};

export const Contexts = React.createContext(initial_state);

export function UserContext({ children }) {
    const [state, dispatch] = useReducer(Reducer, initial_state);

    useEffect(() => {
        localStorage.setItem('token', JSON.stringify(state.token));
    }, [state.token]);

    return (
        <Contexts.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </Contexts.Provider>
    );
}
