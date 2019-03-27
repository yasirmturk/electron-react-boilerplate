import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

type P = {
  onSubmit: string => void
};

class PostInput extends Component<P> {
  state = {};

  onSubmit = e => {
    e.preventDefault();

    const { onSubmit } = this.props;
    const { value } = this.input;

    onSubmit(value);
    this.input.form.reset();
  };

  render() {
    return (
      <form>
        <Grid container style={{ marginTop: 10 }}>
          <TextField
            label="Broadcast a message..."
            style={{ flexGrow: 1 }}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                this.onSubmit(event);
              }
            }}
            inputRef={input => (this.input = input)}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ margin: 12 }}
            onClick={this.onSubmit}
          >
            Send
          </Button>
        </Grid>
      </form>
    );
  }
}

export default PostInput;
