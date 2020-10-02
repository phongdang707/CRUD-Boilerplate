/* eslint-disable react/prop-types */
/*
 * FeaturePage
 *
 * List all the features
 */
import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import ReposListTodo from 'components/RepoListTodo';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import H1 from 'components/H1';
import {
  makeSelectData,
  makeSelectLoading,
  makeSelectError,
} from './selectors';
import Button from './Button';
import Input from './Input';
import Form from './Form';
import messages from './messages';
import { ChangeInputTodo, loadRepos, loadingData } from './actions';
import reducer from './reducer';
import saga from './saga';

export function AddPage({
  inputTodo,
  onChangeInputTodo,
  loading,
  error,
  onSubmitForm,
  loadDataDefault,
  data,
}) {
  const key = 'todoListReducer';
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const reposListProps = {
    loading,
    error,
    data,
  };

  console.log('reposListProps', reposListProps);
  useEffect(() => {
    loadDataDefault();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Add Page</title>
        <meta
          name="description"
          content="Add page of React.js Boilerplate application"
        />
      </Helmet>
      <H1>Add Todo</H1>

      <Form onSubmit={onSubmitForm}>
        <Input
          id="inputTodos"
          type="text"
          placeholder="Add new Todo, Type here"
          value={inputTodo}
          onChange={onChangeInputTodo}
        />
        <Button type="submit">
          <FormattedMessage {...messages.buttonSubmit} />
        </Button>
        <ReposListTodo {...reposListProps} />
        {/* {item} */}
      </Form>
    </div>
  );
}

AddPage.propTypes = {
  loading: PropTypes.bool,
  inputTodo: PropTypes.string,
  onChangeInputTodo: PropTypes.func,
  onSubmitForm: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeInputTodo: evt => dispatch(ChangeInputTodo(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
    loadDataDefault: () => dispatch(loadingData()),
  };
}
const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddPage);
