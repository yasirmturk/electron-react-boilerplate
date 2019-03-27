import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Input
} from '@material-ui/core';

import type { User } from '../reducers/types';

import routes from '../constants/routes';

type P = {
  user: User,
  followers: string => void,
  followings: string => void,
  onUsers: string => void,
  onLogOut: () => void
};

class Settings extends Component<P> {
  state = { selectedFile: null, value: 0 };

  onPhoto = e => {
    const { user } = this.props;
    const file = e.target.files[0];
    this.setState({
      selectedFile: file
    });
    // const fileReader = new FileReader();
    // fileReader.readAsDataURL(e.target.files[0]);
    // fileReader.onload = e => {
    //   console.log(`got the file`);
    //   // this.setState((prevState) => ({
    //   //     [name]: [...prevState[name], e.target.result]
    //   // }));
    // };
  };

  onChange = (event, value) => {
    this.setState({ value });
  };

  onFollowers = () => {
    const { user, followers, onUsers } = this.props;

    onUsers('followers');
    followers(user._id);
  };

  onFollowings = () => {
    const { user, followings, onUsers } = this.props;

    onUsers('followings');
    followings(user._id);
  };

  onSave = () => {
    console.log(`User saved`);
  };

  onLogOut = () => {
    const { onLogOut } = this.props;
    onLogOut();
  };

  render() {
    const {
      user: { profile }
    } = this.props;
    const { value } = this.state;

    return (
      <Grid container>
        {/* <Grid item xs container>
          <Grid item xs />
          <Grid item>
            <Button variant="contained" color="primary" onClick={this.onSave}>
              Save
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} container>
        </Grid> */}
        <Grid item xs={2}>
          <input
            style={{ display: 'none' }}
            accept="image/*"
            id="contained-button-file"
            type="file"
            onChange={this.onPhoto}
            ref={input => (this.fileInput = input)}
          />
          <label htmlFor="contained-button-file">
            <IconButton onClick={() => this.fileInput.click()}>
              <Avatar
                style={{ width: '64px', height: '64px' }}
                alt="d"
                src="https://lh3.googleusercontent.com/-8cQsNrUnVPk/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfUGNTexwxNB5kj8vyVW1hiiH1JZg/s64-c-mo/photo.jpg"
              />
            </IconButton>
          </label>
        </Grid>
        <Grid item xs container spacing={16}>
          <Grid item xs>
            <Typography variant="h6" gutterBottom>
              {profile.fullname}
            </Typography>
            <Divider />
            <Typography variant="subtitle1" gutterBottom>
              @{profile.username}
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              All of the posts you make on Insight do not stay on your public
              profile.
            </Typography>
            <Typography variant="body2" gutterBottom>
              Make all of my posts inaccessible to my followers and delete them
              from Insight's servers after:.
            </Typography>

            <Tabs
              value={value}
              onChange={this.onChange}
              // indicatorColor="primary"
              textColor="secondary"
            >
              <Tab label="1 Day" />
              <Tab label="3 Days" />
              <Tab label="7 Days" />
              <Tab label="30 Days" />
            </Tabs>
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <List>
              <ListItem button onClick={this.onFollowers}>
                <ListItemText
                  primary={`${profile.followers.length} Followers`}
                />
                <ListItemIcon>
                  <i className={`fa fas fa-chevron-right`} />
                </ListItemIcon>
              </ListItem>
              <Divider />
              <ListItem button onClick={this.onFollowings}>
                <ListItemText
                  primary={`${profile.following.length} Following`}
                />
                <ListItemIcon>
                  <i className={`fa fas fa-chevron-right`} />
                </ListItemIcon>
              </ListItem>
            </List>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <List>
              <ListItem button>
                <ListItemText primary="Change Password" />
                <ListItemIcon>
                  <i className={`fa fas fa-chevron-right`} />
                </ListItemIcon>
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText primary="Change Email" />
                <ListItemIcon>
                  <i className={`fa fas fa-chevron-right`} />
                </ListItemIcon>
              </ListItem>
            </List>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to={routes.LOGIN}
              onClick={this.onLogOut}
            >
              Log Out
            </Button>
          </Grid>
          <Grid item xs={12}>
            [ <Link to={routes.REGISTER}>Register a new user</Link> ]
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { followers, followings } from '../actions/user';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ followers, followings }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(Settings);
