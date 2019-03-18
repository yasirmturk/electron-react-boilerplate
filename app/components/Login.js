import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
// import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import type { RootProps } from '../reducers/types';
import routes from '../constants/routes';
import styles from './Auth.css';

type Props = RootProps & {
  authenticate: (string, string) => void,
  authenticated: boolean
};

export default class Login extends Component<Props> {
  props: Props;

  state = {
    username: 'yasir1',
    password: '123456',
    isLoading: false
  };

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    if (nextProps.authenticated === true) {
      console.log('is authenticated');
      console.log(history.replace('/'));
    } else {
      console.log('need to login');
    }
  }

  isValid() {
    const isValid = true;
    if (!isValid) {
      this.setState({});
    }
    return isValid;
  }

  onSubmit = e => {
    e.preventDefault();
    const { authenticate } = this.props;
    const { username, password } = this.state;
    if (this.isValid()) {
      this.setState({ isLoading: true });
      authenticate(username, password);
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { username, password, isLoading } = this.state;
    return (
      <main className={styles.main}>
        <Paper className={styles.paper}>
          <Typography
            component={Link}
            variant="h4"
            to={routes.HOME}
            gutterBottom
          >
            Insight (v1.0 alpha)
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            A chatroom where you only see chats from the people you follow
          </Typography>
          {/* <Avatar className={styles.avatar} /> */}
          <Typography variant="h6" gutterBottom>
            Sign in {isLoading ? '...loading' : ''}
          </Typography>
          <div className={styles.smallContainer}>
            <form className={styles.form} onSubmit={this.onSubmit}>
              <FormControl margin="dense" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={`${styles.submit} ${styles.halfWidth}`}
              >
                Sign in
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className={`${styles.submit} ${styles.halfWidth}`}
                component={Link}
                to="/register"
              >
                Sign Up
              </Button>
            </form>
          </div>
        </Paper>
      </main>
    );
  }
}
