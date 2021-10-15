import { State, authenticateFeatureKey } from './supplies.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAuthenticateState = createFeatureSelector<State>(
    authenticateFeatureKey
);

export const selectUserInformation = createSelector(
    selectAuthenticateState,
    (state: State) => state.userInformation
);
