import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthApi } from "../services/auth-api";
import { Router } from "@angular/router";
import { authActions } from "./auth-actions";
import { catchError, map, of, switchMap } from "rxjs";
import { MyLocalStorage } from "../services/storage";
import { extractToken } from "../util/extractToken";
import { NgToastService } from "ng-angular-popup";


export const loginEffect = createEffect(
    (
        action$ = inject(Actions),
        authApi = inject(AuthApi),
        router = inject(Router),
        NgToastservice = inject(NgToastService),
        MyLocalStorageService = inject(MyLocalStorage)
    ) => {
        return action$.pipe(
            ofType(authActions.login),
            switchMap((loginRequest) => {
                return authApi.login(loginRequest).pipe(
                    map((respone) => {
                        router.navigateByUrl('/products');
                        NgToastservice.success('login successful!', 'Success');
                        MyLocalStorageService.setItem('ngrxStore_token', respone.token)
                        const payload = extractToken(respone.token);
                        if (payload) {
                            return authActions.loginSuccess({ token: respone.token, userId: payload?.sub });

                        }
                        return authActions.loginSuccess({ token: respone.token, userId: null });

                    }),
                    catchError((error) => {
                        NgToastservice.danger('Login failed', 'Error');
                        return of(authActions.loginfailure({ error: error.message }));
                    })

                );
            })
        )
    }
    ,
    {
        functional: true
    }

)


export const regsiterEffect = createEffect(
    (
        action$ = inject(Actions),
        authApi = inject(AuthApi),
        router = inject(Router),
        NgToastservice = inject(NgToastService),

    ) => {
        return action$.pipe(
            ofType(authActions.register),
            switchMap((registerRequest) => {
                return authApi.register(registerRequest).pipe(
                    map(() => {
                        router.navigateByUrl('/login');
                        NgToastservice.success('register successful!', 'Success');
                        return authActions.registerSuccess();
                    }),
                    catchError((error) => {
                        NgToastservice.danger('register failed', 'Error');
                        return of(authActions.registerfailure({ error: error.message }));
                    })

                );
            })
        )
    }
    ,
    {
        functional: true
    }

)