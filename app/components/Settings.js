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
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';

import { DashboardModal } from '@uppy/react';

import PhotoUploader from '../services/upload';
import routes from '../constants/routes';
import type { User } from '../reducers/types';

type P = {
  user: User,
  followers: string => void,
  followings: string => void,
  onUsers: string => void,
  onConnect: () => void,
  onDPChange: ({}) => void,
  options: ({}) => void,
  onLogOut: () => void
};

class Settings extends Component<P> {
  constructor(props) {
    super(props);

    this.uppy = PhotoUploader.create();
  }

  state = { modalOpen: false };

  componentDidMount() {
    const { onConnect, onDPChange } = this.props;

    this.uppy.on('upload-success', (file, response) => {
      console.log(`upload-success ${JSON.stringify(file)}`);
      console.log(`upload-success ${JSON.stringify(response)}`);
      onDPChange(response.body);
    });
    onConnect();
  }

  componentWillUnmount() {
    this.uppy.close();
  }

  handleOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleClose = () => {
    this.uppy.reset();
    this.setState({ modalOpen: false });
  };

  onOptionsChange = (event, value) => {
    const { options } = this.props;
    // this.setState({ value });
    options({ days: value });
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

  render() {
    const {
      user: { profile },
      onLogOut
    } = this.props;
    const { modalOpen } = this.state;
    console.log(`profile: ${JSON.stringify(profile)}`);

    return (
      <Grid container>
        <Grid item xs={2}>
          <IconButton onClick={this.handleOpen}>
            <Avatar
              style={{ width: '64px', height: '64px' }}
              alt="d"
              src={
                profile.picture ||
                'https://img.icons8.com/cotton/64/000000/administrator-male.png'
              }
            />
          </IconButton>
          <DashboardModal
            uppy={this.uppy}
            open={modalOpen}
            // target={this.container}
            // width={320}
            // height={320}
            note="sdfsdfs"
            onRequestClose={this.handleClose}
            plugins={['Webcam']}
            closeModalOnClickOutside
          />
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
              value={profile.options.post.daysToKeep || 1}
              onChange={this.onOptionsChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="1 Day" value={1} />
              <Tab label="3 Days" value={3} />
              <Tab label="7 Days" value={7} />
              <Tab label="30 Days" value={30} />
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
                  <i className="fa fas fa-chevron-right" />
                </ListItemIcon>
              </ListItem>
              <Divider />
              <ListItem button onClick={this.onFollowings}>
                <ListItemText
                  primary={`${profile.following.length} Following`}
                />
                <ListItemIcon>
                  <i className="fa fas fa-chevron-right" />
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
                  <i className="fa fas fa-chevron-right" />
                </ListItemIcon>
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText primary="Change Email" />
                <ListItemIcon>
                  <i className="fa fas fa-chevron-right" />
                </ListItemIcon>
              </ListItem>
            </List>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={routes.LOGIN}
              onClick={onLogOut}
            >
              Log Out
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography component={Link} color="secondary" to={routes.REGISTER}>
              Register a new user
            </Typography>
          </Grid>
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
import { followers, followings, dpChange, options } from '../actions/user';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      followers,
      followings,
      onDPChange: data => dispatch(dpChange(data)),
      options
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(Settings);
