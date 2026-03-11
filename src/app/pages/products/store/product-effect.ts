import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { productActions } from './product-actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProductApi } from '../service/product-api';

export const productEffect = createEffect(
    (action$ = inject(Actions), productApiservice = inject(ProductApi)) => {
        return action$.pipe(
            ofType(productActions.load),
            switchMap(() => {
                return productApiservice.getProducts().pipe(
                    map((products) => productActions.loadSuccess({ products })),
                    catchError((error) => of(productActions.loadFailure({ error: error.message }))),
                );
            }),
        );
    },
    {
        functional: true,
    },
);
