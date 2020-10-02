import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

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
  const [text, setText] = React.useState('');

  const handleOpenEdit = textInput => {
    setText(textInput);
    setOpen(true);
  };

  const handleCloseEdit = () => {
    setOpen(false);
  };

  let content = <div />;

  // If we have items, render them
  if (props.items) {
    content = props.items.map(item => (
      // eslint-disable-next-line no-underscore-dangle
      <Item key={item._id}>
        {item.description} <Span>Delete</Span>{' '}
        <Span onClick={() => handleOpenEdit(item.description)}>Edit</Span>
      </Item>
    ));
  } else {
    // Otherwise render a single component
    content = <div />;
  }

  return (
    <Wrapper>
      <Ul>{content}</Ul>
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseEdit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
}

List.propTypes = {
  items: PropTypes.array,
};

export default List;
