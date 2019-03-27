import React, { Component } from 'react';
import { connect } from 'react-redux';

import Post from './Post';

type P = {
  posts: []
};

type S = {};

class PostList extends Component<P, S> {
  state = {};

  render() {
    const { posts } = this.props;
    // console.log(`posts: ${JSON.stringify(posts)}`);

    return (
      <div>
        {posts.map(post => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.post.feed
  };
}

export default connect(
  mapStateToProps,
  null
)(PostList);
