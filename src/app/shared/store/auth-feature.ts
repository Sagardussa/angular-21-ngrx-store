import { createFeature, createReducer, on } from "@ngrx/store"
import { authActions } from "./auth-actions"

export type AuthState = {
    token: string | null,
    userId: number | null;
    error: string | null,
    isLoading: boolean,
}

export const initialAuthState: AuthState = {
    token: null,
    userId: null,
    error: null,
    isLoading: false
}

export const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        initialAuthState,

        on(authActions.loginSuccess, (state, { token, userId }) => ({
            ...state,
            token,
            userId,
            isLoading: false,
        })),
        on(authActions.loginfailure, (state, { error }) => ({
            ...state,
            token: null,
            error
        })),
        on(authActions.login, (state) => ({
            ...state,
            isLoading: true,
            error: null
        })),

        on(authActions.register, (state) => ({
            ...state,
            isLoading: true,
            error: null
        })),

        on(authActions.registerSuccess, (state) => ({
            ...state,
            isLoading: false
        })),
        on(authActions.registerfailure, (state, { error }) => ({
            ...state,
            isLoading: false,
            error
        })),


    )
})