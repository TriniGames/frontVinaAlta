import { Injectable } from '@angular/core';
import { State, Selector, Action } from '@ngxs/store';
import { StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { LoginInfo } from 'src/app/shared/models/authenticate/login-info.model';
import { UserInformation } from 'src/app/shared/models/authenticate/user-information.model';
import { AuthenticateService } from '../services/authenticate.service';
import { GetLogin, SetUserInformation } from './authenticate.actions';

export interface Authentication {
  userInformation: UserInformation;
}

@State<Authentication>({
  name: 'authenticate',
  defaults: {
    userInformation: null,
  },
})
@Injectable()
export class AuthenticateState {
  constructor(private authenticateService: AuthenticateService) {}

  @Selector()
  static token(state: Authentication): string {
    return state.userInformation.jwt;
  }

  @Selector()
  static selectUserInformation(state: Authentication) {
    return state.userInformation;
  }

  @Action(SetUserInformation)
  setUserInformation(
    context: StateContext<Authentication>,
    action: SetUserInformation
  ) {
    context.patchState({
      userInformation: action.userInformation,
    });
  }

  @Action(GetLogin)
  getLogin(context: StateContext<Authentication>, action: GetLogin) {
    return this.authenticateService.login(action.loginInfo).pipe(
      tap((loginInfo) => {
        context.patchState({
          userInformation: loginInfo,
        });
      })
    );
  }
}
