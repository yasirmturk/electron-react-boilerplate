import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import type { RootProps } from '../reducers/types';
import styles from './Auth.css';

type Props = RootProps & {
  onRegister: (string, string, string) => void
  // authenticated: boolean
};

class Register extends Component<Props> {
  props: Props;

  state = {
    user: {
      fullname: 'Yasir 1',
      email: 'yasirmturk+1@gmail.com',
      password: '123456',
      username: 'yasir1'
    }
  };

  // componentWillUpdate() {
  //   const { authenticated, history } = this.props;
  //   if (authenticated === true) {
  //     console.log('is authenticated');
  //     console.log(history.replace('/'));
  //   } else {
  //     // this.setState({ isLoading: false });
  //     console.log('need to login');
  //   }
  // }

  isValid() {
    const isValid = true;
    if (!isValid) {
      this.setState({});
    }
    return isValid;
  }

  onSubmit = e => {
    e.preventDefault();
    if (this.isValid()) {
      const { onRegister } = this.props;
      const { user } = this.state;
      this.setState({ errors: {}, isLoading: true });
      onRegister(user);
    }
  };

  onChange = e => {
    const { user } = this.state;
    this.setState({ user: { ...user, [e.target.name]: e.target.value } });
  };

  render() {
    const { user } = this.state;

    return (
      <div className={styles.smallContainer}>
        <form className={styles.form} onSubmit={this.onSubmit}>
          <FormControl margin="dense" fullWidth>
            <InputLabel htmlFor="fullname">Full Name</InputLabel>
            <Input
              id="fullname"
              name="fullname"
              autoComplete="name"
              value={user.fullname || ''}
              onChange={this.onChange}
              autoFocus
            />
          </FormControl>
          <FormControl margin="dense" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="email"
              value={user.email || ''}
              onChange={this.onChange}
            />
          </FormControl>
          <FormControl margin="dense" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={user.password || ''}
              onChange={this.onChange}
            />
          </FormControl>
          <FormControl margin="dense" required fullWidth>
            <InputLabel htmlFor="username">@Username</InputLabel>
            <Input
              id="username"
              name="username"
              autoComplete="username"
              value={user.username || ''}
              onChange={this.onChange}
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={`${styles.submit} ${styles.halfWidth}`}
          >
            Sign Up
          </Button>
          {/* <Button
            variant="contained"
            color="secondary"
            className={`${styles.submit} ${styles.halfWidth}`}
            component={Link}
            to="/login"
            replace
          >
            Log In
          </Button> */}
        </form>
      </div>
    );
  }
}

export default Register;
