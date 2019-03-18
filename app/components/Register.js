import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import type { RootProps } from '../reducers/types';
import routes from '../constants/routes';
import styles from './Auth.css';

type Props = RootProps & {
  register: (string, string, string) => void,
  authenticated: boolean
};

class Register extends Component<Props> {
  props: Props;

  state = {
    user: {
      fullname: 'Yasir 1',
      email: 'yasirmturk+1@gmail.com',
      password: '123456',
      username: 'yasir1'
    },
    errors: {},
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
    if (this.isValid()) {
      const { register } = this.props;
      const { user } = this.state;
      this.setState({ errors: {}, isLoading: true });
      register(user);
    }
  };

  onChange = e => {
    const { user } = this.state;
    this.setState({ user: { ...user, [e.target.name]: e.target.value } });
  };

  render() {
    const { authenticated, history } = this.props;
    if (authenticated === true) {
      console.log('is authenticated');
      console.log(history.replace('/'));
    } else {
      console.log('need to login');
    }

    const { user, isLoading, errors } = this.state;

    return (
      <div>
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
          <Typography variant="h6" gutterBottom>
            How It Works {isLoading} {errors}
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <i className="fas fa-check-double" />
              </ListItemIcon>
              <ListItemText
                primary="Insight is a chat app that lets you see chats only from the people
            you follow"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <i className="fas fa-check-double" />
              </ListItemIcon>
              <ListItemText
                primary="Unlike Twitter, Insight is a real-time chatfeed without as much
            pressure of chasing for reputation, like, RTs and followers"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <i className="fas fa-check-double" />
              </ListItemIcon>
              <ListItemText
                primary="Unlike Twitter, Insight is a real-time chatfeed without as much
            pressure of chasing for reputation, like, RTs and followers"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <i className="fas fa-check-double" />
              </ListItemIcon>
              <ListItemText
                primary="Unlike Twitter, Insight is a real-time chatfeed without as much
            pressure of chasing for reputation, like, RTs and followers"
              />
            </ListItem>
          </List>
          {/* <Typography component="p" gutterBottom>
          Sign up below
        </Typography> */}
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
              <Button
                variant="outlined"
                color="primary"
                className={`${styles.submit} ${styles.halfWidth}`}
                component={Link}
                to="/login"
              >
                Log In
              </Button>
            </form>
          </div>
        </Paper>
      </div>
    );
  }
}

export default Register;
