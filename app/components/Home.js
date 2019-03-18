// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Settings from './Settings';
import Leaderboard from './Leaderboard';
import ChatRoom from './ChatRoom';

import type { User, Room } from '../reducers/types';
import routes from '../constants/routes';
import styles from './Home.css';

type Props = {
  classes: {},
  user: User,
  room: Room,
  // rooms: [],
  onConnect: () => void,
  onLogOut: () => void
};

type State = {
  anchorEl: {},
  selectedTab: number
};

const drawerWidth = 73;
const menu = [
  {
    name: 'Home',
    icon: 'fa-home'
  },
  {
    name: 'Leaderboard',
    icon: 'fa-chart-line'
  },
  {
    name: 'Settings',
    icon: 'fa-cog'
  }
];

function HomePlaceholder(props) {
  const {
    user: { profile }
  } = props;
  return (
    <Grid container justify="center">
      <Grid item xs={12} md={10}>
        <Paper style={{ padding: 20 }}>
          <br />
          <Typography variant="h6">
            Welcome to {profile.username}'s Home
          </Typography>
          <br />
          <Typography variant="subtitle1">Dear {profile.fullname},</Typography>
          <br />
          <Typography variant="subtitle2">
            You have {profile.followers.length} followers now!!! and You are
            following {profile.following.length} leaders now!!!
          </Typography>
          <br />
          <Typography variant="body1">
            You can click on your chat room from the left menu to connect with
            your followers, or otherwise You can also click on your Leader's
            profile to connect with their chatroom
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

function MyRoomMenuItem(props) {
  const { room, onRoom } = props;
  return (
    <List>
      <ListItem button key="room" primary="{item.name}" onClick={onRoom}>
        <Badge badgeContent={room.connections.length} color="secondary">
          <Avatar>
            <i className={`${styles.menuItem} fas fa-comments`} />
          </Avatar>
        </Badge>
      </ListItem>
    </List>
  );
}

class Home extends Component<Props, State> {
  props: Props;

  state = {
    anchorEl: null,
    selectedTab: 0
  };

  componentWillMount() {
    const { onConnect } = this.props;
    onConnect();
  }

  onSync = e => {
    console.log('onConnect');
    const { onConnect } = this.props;
    onConnect();
  };

  onMenuOpen = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  onMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  logOut = () => {
    this.onMenuClose();
    const { onLogOut } = this.props;
    onLogOut();
  };

  onRoom = () => {
    // const { user, room } = this.props;
    // socket.chat(room._id, user.username);
    this.setState({ selectedTab: 11 });
  };

  render() {
    const { classes, user, room, onLogOut } = this.props;
    const { anchorEl, selectedTab } = this.state;
    const isMenuOpen = Boolean(anchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.onMenuClose}
      >
        <MenuItem onClick={this.onMenuClose}>Profile</MenuItem>
        <MenuItem component={Link} to={routes.LOGIN} onClick={this.logOut}>
          Logout
        </MenuItem>
      </Menu>
    );

    return (
      <div className={styles.container}>
        <CssBaseline />
        <AppBar position="fixed" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h5" component={Link} to={routes.HOME} noWrap>
              Insight (v1.0 alpha)
            </Typography>
            <div className={{ flexGrow: 1 }} />
            <Fab
              color="secondary"
              aria-label="Add"
              className={classes.fabButton}
            >
              <i className="fas fa-poo-storm fa-3x" />
            </Fab>
            <div style={{ flexGrow: 1 }} />
            <IconButton onClick={this.onSync}>
              <i className="fas fa-sync-alt" />
            </IconButton>
            <IconButton
              aria-owns={isMenuOpen ? 'material-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.onMenuOpen}
            >
              <i className="fas fa-user-circle" />
            </IconButton>
          </Toolbar>
        </AppBar>
        {renderMenu}
        <Drawer
          variant="permanent"
          anchor="left"
          style={{ width: drawerWidth, flexShrink: 0 }}
        >
          <div className={classes.toolbar} />
          <Divider />
          <List>
            {menu.map((item, index) => (
              <ListItem
                button
                key={item.name}
                primary={item.name}
                onClick={() => this.setState({ selectedTab: index })}
              >
                <Avatar>
                  <i className={`${styles.menuItem} fas ${item.icon}`} />
                </Avatar>
              </ListItem>
            ))}
          </List>
          <Divider />
          {room && <MyRoomMenuItem room={room} onRoom={this.onRoom} />}
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {selectedTab === 0 && user && user.profile && (
            <HomePlaceholder user={user} />
          )}
          {selectedTab === 1 && <Leaderboard />}
          {selectedTab === 2 && <Settings onLogOut={onLogOut} />}
          {selectedTab === 11 && user && room && (
            <ChatRoom user={user} room={room} />
          )}
        </main>
      </div>
    );
  }
}
const mStyles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  fabButton: {
    position: 'absolute',
    // zIndex: 1,
    top: 30,
    left: 0,
    right: 0,
    margin: '0 auto'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 0
  },
  toolbar: theme.mixins.toolbar
});

export default withStyles(mStyles)(Home);
