import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/ListTodo';
import LoadingIndicator from 'components/LoadingIndicator';
import ListItem from 'components/ListItem';

function ReposList({ loading, error, data }) {
  console.log('data', data);
  console.log('error', error);
  console.log('loading', loading);
  if (loading) {
    return <List component={LoadingIndicator} />;
  }
  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item="Something went wrong, please try again!" />
    );
    return <List component={ErrorComponent} />;
  }

  if (data !== false) {
    return <List items={data} />;
  }
  return null;
}

ReposList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  data: PropTypes.any,
};

export default ReposList;
