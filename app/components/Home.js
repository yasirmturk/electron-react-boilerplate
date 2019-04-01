// @flow
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Feed from './Feed';
import Settings from './Settings';
import Leaderboard from './Leaderboard';
import Profile from './Profile';
import UserList from './UserList';
import ChatRoom from './ChatRoom';

import type { User, Room, StyleClass } from '../reducers/types';
import styles from './Home.css';

type Props = StyleClass & {
  user: User,
  room: Room,
  feedCount: number,
  onConnect: () => void,
  onLogOut: () => void
};

type State = {
  selectedTab: number,
  lastTab: number,
  selectedUser: User,
  usersList: Array<User>
};

const drawerWidth = 73;
const menu = [
  { name: 'Home', icon: 'fa-home' },
  { name: 'Leaderboard', icon: 'fa-chart-line' },
  { name: 'Settings', icon: 'fa-cog' }
];

class Home extends Component<Props, State> {
  props: Props;

  state = {
    selectedTab: 0,
    lastTab: -1,
    selectedUser: null,
    usersList: []
  };

  static getDerivedStateFromProps(props, state) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    if (!props.user) {
      return null;
    }

    if (props.user.followers !== state.usersList) {
      return {
        usersList: props.user.followers
      };
    }

    if (props.user.followings !== state.usersList) {
      return {
        usersList: props.user.followings
      };
    }

    return null;
  }

  componentDidMount() {
    const { onConnect } = this.props;
    onConnect();
  }

  onMenu = tab => {
    this.setState({ selectedTab: tab, lastTab: -1 });
  };

  onBack = () => {
    const { lastTab } = this.state;
    this.setState({ selectedTab: lastTab, lastTab: -1, usersList: [] });
  };

  onUsers = which => {
    const { user } = this.props;
    const { selectedTab } = this.state;
    this.setState({
      lastTab: selectedTab,
      selectedTab: 13,
      usersList: user[which]
    });
  };

  onRoom = () => {
    this.setState({ selectedTab: 99, lastTab: -1 });
  };

  onProfile = user => {
    const { selectedTab } = this.state;
    this.setState({
      lastTab: selectedTab,
      selectedTab: 12,
      selectedUser: user
    });
  };

  render() {
    const { classes, user, room, onConnect, onLogOut } = this.props;
    const { selectedTab, lastTab, selectedUser, usersList } = this.state;

    // console.log(`user: ${JSON.stringify(user)}`);
    // const HomeView =
    //   feedCount > 0 ? (
    //     // <Grid item xs={12}>
    //     // </Grid>
    //     <Feed />
    //   ) : (
    //     user && user.profile && <HomePlaceholder user={user} />
    //   );

    return (
      <div className={styles.container}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          anchor="left"
          style={{ width: drawerWidth }}
        >
          <List>
            {menu.map((item, index) => (
              <ListItem
                button
                key={item.name}
                primary={item.name}
                onClick={() => this.onMenu(index)}
                selected={selectedTab === index}
              >
                <Avatar>
                  <i className={`${styles.menuItem} fas ${item.icon}`} />
                </Avatar>
              </ListItem>
            ))}
          </List>
          <Divider />
          {/* {room && <MyRoomMenuItem room={room} onRoom={this.onRoom} />} */}
        </Drawer>
        <Paper square className={classes.content}>
          {lastTab >= 0 && (
            <Button variant="contained" color="secondary" onClick={this.onBack}>
              Back
            </Button>
          )}
          <main style={{ height: '100%' }} className={classes.content}>
            {selectedTab === 0 && <Feed />}
            {selectedTab === 1 && <Leaderboard onProfile={this.onProfile} />}
            {selectedTab === 2 && user && user.profile && (
              <Settings
                user={user}
                onConnect={onConnect}
                onLogOut={onLogOut}
                onUsers={this.onUsers}
              />
            )}
            {selectedTab === 12 && selectedUser && (
              <Profile user={selectedUser} />
            )}
            {selectedTab === 13 && usersList && (
              <UserList users={usersList} onProfile={this.onProfile} />
            )}
            {selectedTab === 99 && user && room && (
              <ChatRoom user={user} room={room} />
            )}
          </main>
        </Paper>
      </div>
    );
  }
}
const mStyles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 1
  },
  toolbar: theme.mixins.toolbar
});

export default withStyles(mStyles)(Home);

// /////////////////////////////////////
// function HomePlaceholder(props) {
//   const {
//     user: { profile }
//   } = props;
//   return (
//     <Grid container>
//       <Grid item xs={12}>
//         <br />
//         <Typography variant="h6">
//           Welcome to {profile.username}'s Home
//         </Typography>
//         <Divider />
//       </Grid>
//       <Grid item xs={12}>
//         <br />
//         <Typography variant="subtitle1">Dear {profile.fullname},</Typography>
//         <br />
//         <Typography variant="subtitle2">
//           You have {profile.followers.length} followers now!!! and You are
//           following {profile.following.length} leaders now!!!
//         </Typography>
//         <br />
//         <Divider />
//       </Grid>
//       <Grid item xs={12}>
//         <br />
//         <Typography variant="body1" style={{ textAlign: 'center' }}>
//           It's looking empty here! But that's normal. Find familiar faces you
//           know by clicking on the leaderboard icon just to the left!
//         </Typography>
//         <br />
//         <Divider />
//       </Grid>
//       <Grid item xs={12}>
//         <Feed />
//       </Grid>
//     </Grid>
//   );
// }

// function MyRoomMenuItem(props) {
//   const { room, onRoom } = props;
//   return (
//     <List>
//       <ListItem button key="room" primary="{item.name}" onClick={onRoom}>
//         <Badge badgeContent={room.connections.length} color="secondary">
//           <Avatar>
//             <i className={`${styles.menuItem} fas fa-comments`} />
//           </Avatar>
//         </Badge>
//       </ListItem>
//     </List>
//   );
// }
