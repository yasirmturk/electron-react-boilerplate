import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

type P = {
  onSubmit: string => void
};

function setNativeValue(element, value) {
  const setter = Object.getOwnPropertyDescriptor(element, 'value').set;
  const pSetter = Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(element),
    'value'
  ).set;
  if (setter && setter !== pSetter) {
    pSetter.call(element, value);
  } else {
    setter.call(element, value);
  }
}

class PostInput extends Component<P> {
  state = {};

  onKeyDown = e => {
    const { target } = e;
    const { value } = target;
    if (e.key === 'Enter') {
      // if (event.keyCode === 13) {
      if (e.shiftKey) {
        console.log(`key line break`);
      } else if (e.ctrlKey || e.altKey) {
        const start = target.selectionStart;
        const val = `${value.slice(0, start)}\n${value.slice(
          target.selectionEnd
        )}`;
        // target.value = val;
        setNativeValue(target, val);
        target.selectionStart = target.selectionEnd = start + 1;
        target.dispatchEvent(new Event('input', { bubbles: true }));
      } else {
        e.preventDefault();
        this.onSubmit(e);
        return false;
      }
    }
  };

  onSubmit = e => {
    e.preventDefault();

    const { onSubmit } = this.props;
    const { value } = this.input;

    onSubmit(value);
    this.input.value = '';
    // this.input.form.reset();
  };

  render() {
    return (
      <Grid item container alignItems="flex-end">
        <InputBase
          autoFocus
          multiline
          // fullWidth
          // variant="outlined"
          rowsMax={8}
          // label="Broadcast a message..."
          placeholder="Broadcast a message..."
          style={{ flexGrow: 1, marginRight: 16 }}
          onKeyDown={this.onKeyDown}
          inputRef={i => {
            this.input = i;
          }}
        />
        <Button variant="contained" color="primary" onClick={this.onSubmit}>
          Send
        </Button>
      </Grid>
    );
  }
}

export default PostInput;
