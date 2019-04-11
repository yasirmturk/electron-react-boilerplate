import React, { Component } from 'react';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Post from './Post';

import { feed } from '../actions/post';

type P = {
  onLoad: () => void,
  getFeed: () => void,
  onProfile: ({}) => void,
  emptyMessage: string,
  posts: []
};

class PostList extends Component<P> {
  state = {};

  componentDidMount() {
    const { getFeed } = this.props;
    getFeed();
  }

  componentDidUpdate() {
    const { onLoad } = this.props;
    onLoad();
  }

  render() {
    const { posts, onProfile, emptyMessage } = this.props;

    return posts.length > 0 ? (
      posts.map(p => <Post key={p._id} post={p} onUser={onProfile} />)
    ) : (
      <React.Fragment>
        <div style={{ minHeight: 100 }} />
        <Typography variant="h6" align="center">
          {emptyMessage}
        </Typography>
      </React.Fragment>
    );
  }
}

const mapState = state => ({
  posts: state.post.feed
});

const mapDispatch = dispatch => ({
  dispatch,
  getFeed() {
    dispatch(feed());
  }
});

export default connect(
  mapState,
  mapDispatch
)(PostList);
