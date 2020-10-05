/**
 * AddPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAddPage = state => state.todoListReducer || initialState;

const makeSelectAddPage = () =>
  createSelector(
    selectAddPage,
    todoListReducer => todoListReducer.todoList,
  );
const makeSelectData = () =>
  createSelector(
    selectAddPage,
    todoListReducer => todoListReducer.todoArray,
  );

const makeSelectLoading = () =>
  createSelector(
    selectAddPage,
    todoListReducer => todoListReducer.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectAddPage,
    todoListReducer => todoListReducer.error,
  );

const makeSelectGetTaskById = () =>
  createSelector(
    selectAddPage,
    todoListReducer => todoListReducer.idSelected,
  );

const makeSelectTaskIdEdit = () =>
  createSelector(
    selectAddPage,
    todoListReducer => todoListReducer.idEdit,
  );

const makeSelectTaskEdit = () =>
  createSelector(
    selectAddPage,
    todoListReducer => todoListReducer.editTaskName,
  );

export {
  selectAddPage,
  makeSelectAddPage,
  makeSelectData,
  makeSelectLoading,
  makeSelectError,
  makeSelectGetTaskById,
  makeSelectTaskIdEdit,
  makeSelectTaskEdit,
};
