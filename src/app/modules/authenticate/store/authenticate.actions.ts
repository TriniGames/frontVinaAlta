import { createAction, props } from '@ngrx/store';
import { LoginInfo } from 'src/app/shared/models/authenticate/login-info.model';
import { UserInformation } from 'src/app/shared/models/authenticate/user-information.model';

export const login = createAction('[AUTH] Login', props<{ loginInfo: LoginInfo }>());

export const storeUserInformation = createAction('[AUTH] Store User Information', props<{ userInformation: UserInformation }>());
