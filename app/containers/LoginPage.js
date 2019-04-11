import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import Login from '../components/Login';
import Register from '../components/Register';
import styles from '../components/Auth.css';

import routes from '../constants/routes';
import type { RootProps } from '../reducers/types';

type P = RootProps & {
  page: string,
  authenticated: boolean,
  authenticate: (string, string) => void,
  register: (string, string, string) => void
};

class LoginPage extends Component<P> {
  props: P;

  state = {
    errors: {},
    isLoading: false
  };

  static getDerivedStateFromProps(nextProps) {
    const { authenticated, history } = nextProps;
    if (authenticated === true) {
      console.log('is authenticated');
      console.log(history.replace('/'));
    }
    return null;
  }

  render() {
    const { authenticate, register, page } = this.props;
    const { isLoading, errors } = this.state;

    const LoginRegister =
      page === 'login' ? (
        <Login onAuthenticate={authenticate} />
      ) : (
        <Register onRegister={register} />
      );

    return (
      <div className="container">
        <CssBaseline />
        <Paper className="content">
          <main className={styles.paper}>
            <Typography
              component={Link}
              variant="h4"
              to={routes.HOME}
              gutterBottom
            >
              Insight (v1.0 alpha)
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              A micro-update room where you have control over when your posts
              expire
            </Typography>
            <Typography variant="h6" gutterBottom>
              How It Works {isLoading ? '...loading' : ''}{' '}
              {Object.entries(errors)}
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <i className="fas fa-check-double" />
                </ListItemIcon>
                <ListItemText primary="Insight is an app that lets you broadcast messages to your followers but you are in control of how long those updates stay on servers and how long they are viewable to your followers" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <i className="fas fa-check-double" />
                </ListItemIcon>
                <ListItemText primary="Unlike Twitter, the posts you make don't stay on your profile" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <i className="fas fa-check-double" />
                </ListItemIcon>
                <ListItemText primary="This leads to less social pressure and much more casual updates among communities" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <i className="fas fa-check-double" />
                </ListItemIcon>
                <ListItemText primary="Twitter over the years has become a platform for people to promote their self interests or compete on vainty metrics and number followers, likes and RTs. The twitter engagement algorithms incentivise sensationalist posts, giving fame and attention to sensationalist rather than focusing the purpose of connecting with others" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <i className="fas fa-check-double" />
                </ListItemIcon>
                <ListItemText primary="Insight breaks down the Twitter noise and is more organic community that's meant to connect people" />
              </ListItem>
            </List>
            {LoginRegister}
            <div className={styles.bigContainer}>
              <div style={{ flexGrow: 1 }} />
              <Button
                // color="secondary"
                className={styles.submit}
                component={Link}
                to={page === 'login' ? '/register' : '/login'}
                replace
              >
                {page === 'login' ? 'Sign Up' : 'Log In'}
              </Button>
            </div>
          </main>
        </Paper>
      </div>
    );
  }
}

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { authenticate, register } from '../actions/user';

const mapState = state => ({
  authenticated: state.user.isAuth
});

function mapDispatch(dispatch) {
  return bindActionCreators({ authenticate, register }, dispatch);
}

export default connect(
  mapState,
  mapDispatch
)(LoginPage);
