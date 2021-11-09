import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, storeUserInformation } from './authenticate.actions';
import { map, mergeMap } from 'rxjs/operators';

import { AuthenticateService } from '../services/authenticate.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserInformation } from 'src/app/shared/models/authenticate/user-information.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticateEffects {
    constructor(
        private actions$: Actions,
        private authenticateService: AuthenticateService,
        private router: Router,
    ) { }

    login$ = createEffect(() => this.actions$.pipe(
        ofType(login),
        mergeMap((action) =>
            this.authenticateService.login(action.loginInfo)
                .pipe(
                    map((userInformation: UserInformation) => {
                        if (userInformation && userInformation.jwt) {
                            this.router.navigate(['/main']);
                        }

                        return storeUserInformation({ userInformation });
                    }),
                    //catchError(error => of(getError({ error })))
                ))
    ));
}
