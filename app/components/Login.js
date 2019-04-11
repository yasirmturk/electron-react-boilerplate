import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import type { RootProps } from '../reducers/types';
import styles from './Auth.css';

type Props = RootProps & {
  onAuthenticate: (string, string) => void
};

export default class Login extends Component<Props> {
  props: Props;

  state = {
    username: process.env.NODE_ENV === 'production' ? '' : 'yasirmturk',
    password: process.env.NODE_ENV === 'production' ? '' : '123456',
    isLoading: false
  };

  isValid() {
    const isValid = true;
    if (!isValid) {
      this.setState({});
    }
    return isValid;
  }

  onSubmit = e => {
    e.preventDefault();
    const { onAuthenticate } = this.props;
    const { username, password } = this.state;
    if (this.isValid()) {
      this.setState({ isLoading: true });
      onAuthenticate(username, password);
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { username, password, isLoading } = this.state;
    return (
      <div className={styles.smallContainer}>
        <Typography variant="h6" gutterBottom>
          Sign in {isLoading ? '...loading' : ''}
        </Typography>
        <form className={styles.form} onSubmit={this.onSubmit}>
          <FormControl margin="dense" required fullWidth>
            <InputLabel htmlFor="username">
              Email Address or Username
            </InputLabel>
            <Input
              id="username"
              name="username"
              autoComplete="email"
              value={username}
              onChange={this.onChange}
              autoFocus
            />
          </FormControl>
          <FormControl margin="dense" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={this.onChange}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <br />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={`${styles.submit} ${styles.halfWidth}`}
          >
            Sign in
          </Button>
        </form>
      </div>
    );
  }
}
