import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { FormControl, InputLabel, Input } from '@material-ui/core';

// eslint-disable-next-line import/order
import type { User } from '../reducers/types';

type P = {
  user: User,
  updatePassword: ({}) => void
};

class ChangePassword extends Component<P> {
  state = { error: '', matchError: '' };

  componentDidUpdate() {
    const { error, matchError } = this.state;

    if (error.length > 0) {
      alert(error);
    }

    if (matchError.length > 0) {
      alert(matchError);
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const { updatePassword } = this.props;
    // onSave({});
    if (this.oldPassword.value.length < 6) {
      this.setState({ error: 'Please provide valid old password!' });
    } else if (this.newPassword1.value !== this.newPassword2.value) {
      this.setState({ matchError: 'New password does not match!' });
    } else {
      updatePassword({
        oldPassword: this.oldPassword.value,
        newPassword: this.newPassword1.value
      });
    }
  };

  render() {
    const { error, matchError } = this.state;

    return (
      <Grid container style={{ padding: 16 }}>
        <Grid item xs container>
          <form onSubmit={this.onSubmit}>
            <FormControl
              margin="dense"
              error={error.length > 0}
              required
              fullWidth
            >
              <InputLabel htmlFor="password">Old Password</InputLabel>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                inputRef={i => {
                  this.oldPassword = i;
                }}
                autoFocus
              />
            </FormControl>
            <FormControl margin="dense" required fullWidth>
              <InputLabel htmlFor="newpassword1">New Password</InputLabel>
              <Input
                id="newpassword1"
                name="newpassword1"
                type="password"
                inputRef={i => {
                  this.newPassword1 = i;
                }}
              />
            </FormControl>
            <FormControl
              margin="dense"
              error={matchError.length > 0}
              required
              fullWidth
            >
              <InputLabel htmlFor="newpassword2">
                Repeat New Password
              </InputLabel>
              <Input
                id="newpassword2"
                name="newpassword2"
                type="password"
                inputRef={i => {
                  this.newPassword2 = i;
                }}
              />
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
              Change Password
            </Button>
          </form>
        </Grid>
      </Grid>
    );
  }
}

// eslint-disable-next-line import/first, import/order
import { connect } from 'react-redux';
// eslint-disable-next-line import/first, import/order
import { bindActionCreators } from 'redux';
// eslint-disable-next-line import/first
import { updatePassword } from '../actions/user';

function mapDispatch(dispatch) {
  return bindActionCreators({ updatePassword }, dispatch);
}

export default connect(
  null,
  mapDispatch
)(ChangePassword);
