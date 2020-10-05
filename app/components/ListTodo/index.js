/* eslint-disable react/no-unescaped-entities */
import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from 'containers/AddPage/reducer';
import saga from 'containers/AddPage/saga';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import DialogContentText from '@material-ui/core/DialogContentText';
import {
  selectedTaskId,
  changeEditTask,
  updateTask,
} from '../../containers/AddPage/actions';

import Ul from './Ul';
import Wrapper from './Wrapper';
import Item from './Item';
import Span from './Span';

const useStyles = makeStyles({
  root: {
    '& > *': {
      minWidth: '600px',
    },
  },
});

function List(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openDel, setOpenDel] = React.useState(false);
  const [text, setText] = React.useState('');
  const [id, setId] = React.useState('');

  const key = 'todoListReducer';
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const handleOpenEdit = (textInput, idTask) => {
    setText(textInput);
    setId(idTask);
    setOpen(true);
  };

  const handleCloseEdit = () => {
    setOpen(false);
  };

  const handleOpenDel = (textInput, idTask) => {
    setText(textInput);
    setId(idTask);
    setOpenDel(true);
  };

  const handleCloseDel = () => {
    setOpenDel(false);
  };

  const handleDeleteTaskById = () => {
    props.onChangeSelectedTask(id);
    setOpenDel(false);
  };

  const handleChangeUpdateTask = e => {
    props.onChangeInputTask({ idTask: id, taskValue: e.target.value });
  };

  const handleUpdateTask = () => {
    setOpen(false);
    props.submitUpdateTask();
  };

  let content = <div />;

  // If we have items, render them
  if (props.items) {
    content = props.items.map(item => (
      // eslint-disable-next-line no-underscore-dangle
      <Item key={item._id}>
        {item.description}{' '}
        <Span onClick={() => handleOpenDel(item.description, item._id)}>
          Delete
        </Span>
        <Span onClick={() => handleOpenEdit(item.description, item._id)}>
          Edit
        </Span>
      </Item>
    ));
  } else {
    // Otherwise render a single component
    content = <div />;
  }

  return (
    <Wrapper>
      <Ul>{content}</Ul>

      {/* Edit */}
      <Dialog
        fullWidth="300px"
        open={open}
        onClose={handleCloseEdit}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        <DialogTitle id="form-dialog-title">Edit Todo Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="todo"
            label="Todo Task"
            fullWidth
            defaultValue={text}
            onChange={handleChangeUpdateTask}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleUpdateTask}
            color="primary"
            variant="contained"
            href="#contained-buttons"
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete */}
      <Dialog
        fullWidth="300px"
        open={openDel}
        onClose={handleCloseDel}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        <DialogTitle id="form-dialog-title">Delete Todo Task!!!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want delete "{text}" ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDel} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDeleteTaskById}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
}

List.propTypes = {
  items: PropTypes.array,
  onChangeSelectedTask: PropTypes.func,
  onChangeInputTask: PropTypes.func,
  submitUpdateTask: PropTypes.func,
};
export function mapDispatchToProps(dispatch) {
  return {
    onChangeSelectedTask: evt => {
      dispatch(selectedTaskId(evt));
    },
    onChangeInputTask: evt => dispatch(changeEditTask(evt)),
    submitUpdateTask: () => dispatch(updateTask()),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(List);
