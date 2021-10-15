import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { exhaustMap, finalize, take } from 'rxjs/operators';
import { LoaderService } from '../services/loader-services';
import * as fromAuthenticate from '../../../../src/app/modules/authenticate/store/authenticate.reducer';
import { selectUserInformation } from 'src/app/modules/authenticate/store/authenticate.selectors';
// import { authorizationType } from '../constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private loaderService: LoaderService,
        private store: Store<{ [fromAuthenticate.authenticateFeatureKey]: fromAuthenticate.State }>
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // return this.store.select(selectUserInformation)
        //     .pipe(
        //         take(1),
        //         exhaustMap((userInformation) => {
        const spinnerSubscription: Subscription = this.loaderService.spinner$.subscribe();
        //             if (userInformation) {
        //                 // const authToken = `${authorizationType} ${userInformation.Token}`;

        //                 const authReq = req.clone({
        //                     headers: new HttpHeaders().set('Content-Type', 'application/json')
        //                 });

        //                 return next.handle(authReq).pipe(finalize(() => spinnerSubscription.unsubscribe()));
        //             } else {
        const loginReq = req.clone({
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        });
        return next.handle(loginReq).pipe(finalize(() => spinnerSubscription.unsubscribe()));
        //         }
        //     })
        // );
    }
}
