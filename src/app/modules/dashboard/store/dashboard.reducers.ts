import { createReducer, on } from '@ngrx/store';
import { ToDo } from '../models/todo.model';
import * as dashboardActions from './dashboard.actions';

export const dashboardFeatureKey = 'dashboard';
export interface DashboardState {
  list: ToDo[];
  error: string | undefined;
}

export const initialDashboardState: DashboardState = {
  list: [],
  error: undefined,
};

export const dashboardReducers = createReducer(
  initialDashboardState,
  on(dashboardActions.getToDoListSuccess, (state, action) => {
    return {
      ...state,
      list: action.list,
      error: undefined,
    };
  }),
  on(dashboardActions.getToDoListFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(dashboardActions.updateToDoSuccess, (state, action) => {
    const changedIndex = state.list.findIndex(
      (todo) => todo.id === action.toDo.id
    );
    const newStatus = !!action.toDo.completed;
    return {
      ...state,
      list: [
        ...state.list,
        (state.list[changedIndex] = {
          ...state.list[changedIndex],
          completed: newStatus,
        }),
      ],
      error: undefined,
    };
  }),
  on(dashboardActions.updateToDoFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  })
);