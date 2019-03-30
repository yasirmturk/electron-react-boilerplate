import React, { Component } from 'react';
import { connect } from 'react-redux';

import Post from './Post';

import { feed } from '../actions/post';

type P = {
  onLoad: () => void,
  getFeed: () => void,
  posts: []
};

type S = {};

class PostList extends Component<P, S> {
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
    const { posts } = this.props;
    // console.log(`posts: ${JSON.stringify(posts)}`);

    return (
      <React.Fragment>
        {posts.map(post => (
          <Post key={post._id} post={post} />
        ))}
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
