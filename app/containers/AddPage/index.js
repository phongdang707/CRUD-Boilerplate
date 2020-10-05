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
import { makeStyles } from '@material-ui/core/styles';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

import H1 from 'components/H1';
import {
  makeSelectData,
  makeSelectLoading,
  makeSelectError,
} from './selectors';
import Form from './Form';
import messages from './messages';
import { ChangeInputTodo, loadRepos, loadingData } from './actions';
import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(() => ({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: '20px 0px',
    float: 'right',
  },
  input: {
    '& > *': {
      width: '100%',
    },
  },
}));

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

  useEffect(() => {
    loadDataDefault();
  }, []);

  const classes = useStyles();

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

      <Form onSubmit={onSubmitForm} className={classes.input}>
        <TextField
          id="standard-basic"
          label="Add new Todo, Type here"
          value={inputTodo}
          onChange={onChangeInputTodo}
          className={classes.input}
        />
        <Button type="submit" variant="contained" className={classes.root}>
          <FormattedMessage {...messages.buttonSubmit} />
        </Button>
        <ReposListTodo {...reposListProps} />
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
