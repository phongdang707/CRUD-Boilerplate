/**
 * Gets the repositories of the user from Github
 */

import { put, select, takeLatest } from 'redux-saga/effects';
import {
  LOAD_REPOS,
  LOADING_DATA,
  SELECTED_TASK_BY_ID,
  UPDATE_TASK,
} from 'containers/AddPage/constants';
import { repoLoadingError, loadData } from 'containers/AddPage/actions';
import axios from 'axios';

import {
  makeSelectAddPage,
  makeSelectGetTaskById,
  makeSelectTaskIdEdit,
  makeSelectTaskEdit,
} from './selectors';

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOADING_DATA, loadDataRespo);
  yield takeLatest(LOAD_REPOS, createTask);
  yield takeLatest(SELECTED_TASK_BY_ID, deleteTaskById);
  yield takeLatest(UPDATE_TASK, updateTaskById);
}
/**
 * Github repos request/response handler
 */
export function* createTask() {
  // Select username from store
  const todoList = yield select(makeSelectAddPage());
  // const dataInit = yield select(makeSelectData());

  // const data = { description: todoList, _id: Math.random() };
  // const dataNew = [...dataInit, data];
  // const { hello } = todoList;
  try {
    const response = yield axios({
      method: 'post',
      url: 'https://api-nodejs-todolist.herokuapp.com/task',
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjc2ZTQzN2E2YTY3MzAwMTc0NzFjNmIiLCJpYXQiOjE2MDE2MjcxOTJ9.x6hiHZB6izKaoLB5RRKKeqX-J5TlqtFJMDu2NVtl5ak',
      },
      data: {
        description: todoList,
      },
    });
    if (response.code === 200) {
      const requestURL = yield axios({
        method: 'get',
        url: 'https://api-nodejs-todolist.herokuapp.com/task',
        headers: {
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjc2ZTQzN2E2YTY3MzAwMTc0NzFjNmIiLCJpYXQiOjE2MDE2MjcxOTJ9.x6hiHZB6izKaoLB5RRKKeqX-J5TlqtFJMDu2NVtl5ak',
        },
      });
      yield put(loadData(requestURL.data.data));
    } else {
      yield put(repoLoadingError(err));
    }
    // yield put(loadData(requestURL.data.data));
  } catch (err) {
    console.log(err);
  }
}

export function* loadDataRespo() {
  const requestURL = yield axios({
    method: 'get',
    url: 'https://api-nodejs-todolist.herokuapp.com/task',
    headers: {
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjc2ZTQzN2E2YTY3MzAwMTc0NzFjNmIiLCJpYXQiOjE2MDE2MjcxOTJ9.x6hiHZB6izKaoLB5RRKKeqX-J5TlqtFJMDu2NVtl5ak',
    },
  });

  try {
    yield put(loadData(requestURL.data.data));
    // Call our request helper (see 'utils/request')
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export function* deleteTaskById() {
  const idTask = yield select(makeSelectGetTaskById());

  try {
    yield axios({
      method: 'delete',
      url: `https://api-nodejs-todolist.herokuapp.com/task/${idTask}`,
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjc2ZTQzN2E2YTY3MzAwMTc0NzFjNmIiLCJpYXQiOjE2MDE2MjcxOTJ9.x6hiHZB6izKaoLB5RRKKeqX-J5TlqtFJMDu2NVtl5ak',
      },
    });
    const requestURL = yield axios({
      method: 'get',
      url: 'https://api-nodejs-todolist.herokuapp.com/task',
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjc2ZTQzN2E2YTY3MzAwMTc0NzFjNmIiLCJpYXQiOjE2MDE2MjcxOTJ9.x6hiHZB6izKaoLB5RRKKeqX-J5TlqtFJMDu2NVtl5ak',
      },
    });
    yield put(loadData(requestURL.data.data));
    // Call our request helper (see 'utils/request')
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export function* updateTaskById() {
  const idTaskEdit = yield select(makeSelectTaskIdEdit());
  const taskDes = yield select(makeSelectTaskEdit());

  try {
    yield axios({
      method: 'put',
      url: `https://api-nodejs-todolist.herokuapp.com/task/${idTaskEdit}`,
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjc2ZTQzN2E2YTY3MzAwMTc0NzFjNmIiLCJpYXQiOjE2MDE2MjcxOTJ9.x6hiHZB6izKaoLB5RRKKeqX-J5TlqtFJMDu2NVtl5ak',
      },
      data: {
        description: taskDes,
      },
    });
    const requestURL = yield axios({
      method: 'get',
      url: 'https://api-nodejs-todolist.herokuapp.com/task',
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjc2ZTQzN2E2YTY3MzAwMTc0NzFjNmIiLCJpYXQiOjE2MDE2MjcxOTJ9.x6hiHZB6izKaoLB5RRKKeqX-J5TlqtFJMDu2NVtl5ak',
      },
    });
    yield put(loadData(requestURL.data.data));
    // Call our request helper (see 'utils/request')
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}
