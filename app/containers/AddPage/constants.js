/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_TODO = 'boilerplate/Home/CHANGE_TODO';

export const LOAD_REPOS = 'boilerplate/Home/LOAD_REPOS';

export const LOAD_REPOS_ERROR = 'boilerplate/Home/LOAD_REPOS_ERROR';

export const LOAD_DATA = 'boilerplate/Home/LOAD_DATA';

export const LOADING_DATA = 'boilerplate/Home/LOADING_DATA';

export const LOAD_DATA_APPEND = 'boilerplate/Home/LOAD_DATA_APPEND';

export const DELETE_TASK_BY_ID = 'boilerplate/Home/DELETE_TASK_BY_ID';

export const SELECTED_TASK_BY_ID = 'boilerplate/Home/SELECTED_TASK_BY_ID';

export const CHANGE_EDIT_TASK = 'boilerplate/Home/CHANGE_EDIT_TASK';

export const UPDATE_TASK = 'boilerplate/Home/UPDATE_TASK';
