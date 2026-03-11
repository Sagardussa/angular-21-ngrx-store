import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { RegisterRequest } from "../services/auth-api";


export const authActions = createActionGroup({
    source: 'Auth',
    events: {
        login: props<{ username: string, password: string }>(),
        loginSuccess: props<{ token: string, userId: number | null }>(),
        loginfailure: props<{ error: string }>(),

        register: props<RegisterRequest>(),
        registerSuccess: emptyProps(),
        registerfailure: props<{ error: string }>(),




    }
})