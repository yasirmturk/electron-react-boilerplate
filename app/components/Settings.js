import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import routes from '../constants/routes';

type P = {
  onLogOut: () => void
};

type S = {};

class Settings extends Component<P, S> {
  state = {};

  onProfile = () => {
    console.log(`User profile`);
  };

  onLogOut = () => {
    const { onLogOut } = this.props;
    onLogOut();
  };

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12} md={10}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="body2">User settings</Typography>
            <br />
            <IconButton onClick={this.onProfile}>Profile</IconButton>
            <br />
            <IconButton component={Link} to={routes.REGISTER}>
              Register a new user
            </IconButton>
            <br />
            <IconButton component={Link} to={routes.LOGIN}>
              Login with another user
            </IconButton>
            <br />
            <IconButton
              component={Link}
              to={routes.LOGIN}
              onClick={this.onLogOut}
            >
              Logout
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default Settings;
