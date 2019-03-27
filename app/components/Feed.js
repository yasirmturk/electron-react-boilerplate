import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import PostList from './PostList';
import PostInput from './PostInput';

type P = {
  getFeed: () => void,
  onPostSubmitted: ({}) => void
};

type S = {
  feed: Array
};

class Feed extends Component<P, S> {
  state = {
    feed: []
  };

  componentDidMount() {
    const { getFeed } = this.props;
    getFeed();
  }

  onPostSubmit = content => {
    const { onPostSubmitted } = this.props;

    const post = {
      content: content
    };
    onPostSubmitted(post);
  };
  render() {
    return (
      <Grid container justify="center" style={{ flexGrow: 1 }}>
        <Grid item xs={12} md={10}>
          <PostList />
          <PostInput onSubmit={this.onPostSubmit} />
        </Grid>
      </Grid>
    );
  }
}

import { feed, create } from '../actions/post';

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getFeed() {
      dispatch(feed());
    },
    onPostSubmitted(post) {
      dispatch(create(post));
    }
    // onPostReceived(post) {
    //   console.log('message received', post);
    //   dispatch(addPost(post));
    // }
  };
}
export default connect(
  null,
  mapDispatchToProps
)(Feed);
