// @flow
import React from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';
import { current, logout } from '../actions/user';

// type Props = {};

// class HomePage extends Component<Props> {
//   props: Props;

//   render() {
//     return <Home />;
//   }
// }

const mapStateToProps = state => ({
  user: state.user.user,
  room: state.user.room
});

const mapDispatchToProps = dispatch => ({
  onConnect: () => dispatch(current()),
  onLogOut: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
