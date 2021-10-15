import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authenticateFeatureKey, State } from './authenticate.reducer';

export const selectAuthenticateState = createFeatureSelector<State>(
    authenticateFeatureKey
);

export const selectUserInformation = createSelector(
    selectAuthenticateState,
    (state: State) => state.userInformation
);
