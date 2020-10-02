/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  CHANGE_TODO,
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_DATA,
  LOADING_DATA,
  LOAD_REPOS_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  todoList: '',
  todoArray: [],
  loading: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const addPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_TODO:
        draft.todoList = action.inputTodo;
        break;
      case LOAD_REPOS:
        draft.loading = true;
        draft.error = false;
        break;
      case LOAD_REPOS_SUCCESS:
        {
          const { dataInit, repos } = action;
          const data = [...dataInit, repos];
          draft.loading = false;
          draft.todoArray = data;
        }
        break;
      case LOADING_DATA:
        draft.loading = true;
        draft.error = false;
        break;
      case LOAD_DATA:
        draft.loading = false;
        draft.todoArray = action.data;
        break;
      case LOAD_REPOS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default addPageReducer;
