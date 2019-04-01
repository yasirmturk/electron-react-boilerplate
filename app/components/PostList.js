import React, { Component } from 'react';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Post from './Post';

import { feed } from '../actions/post';

type P = {
  onLoad: () => void,
  getFeed: () => void,
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

    // setInterval(() => {
    //   onLoad();
    // }, 100);
  }

  render() {
    const { posts, emptyMessage } = this.props;
    // console.log(`posts: ${JSON.stringify(posts)}`);

    return (
      <React.Fragment>
        <div style={{ minHeight: 100 }} />
        {posts.length > 0 ? (
          posts.map(post => <Post key={post._id} post={post} />)
        ) : (
          <Typography variant="h6" align="center">
            {emptyMessage}
          </Typography>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.post.feed
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getFeed() {
      dispatch(feed());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);
