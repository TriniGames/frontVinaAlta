import { Action, createReducer, on } from '@ngrx/store';
import { UserInformation } from 'src/app/shared/models/authenticate/user-information.model';
import { storeUserInformation } from '../../authenticate/store/authenticate.actions';

export const authenticateFeatureKey = 'authenticateInfo';
export interface State {
  userInformation: UserInformation | null;
}

const initialState: State = {
  userInformation: null,
};

const authenticateReducer = createReducer(
  initialState,
  on(storeUserInformation, (state, action) => ({
    ...state,
    userInformation: { ...action.userInformation },
  }))
);

export function reducer(state: State | undefined, action: Action): State {
  return authenticateReducer(state, action);
}
