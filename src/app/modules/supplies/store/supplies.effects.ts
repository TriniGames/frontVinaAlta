import { Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticateEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
    ) { }

}
