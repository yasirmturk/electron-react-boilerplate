import React, { Component } from 'react';
import { connect } from 'react-redux';

import Divider from '@material-ui/core/Divider';

import PostList from './PostList';
import PostInput from './PostInput';

import { create } from '../actions/post';

type P = {
  onPostSubmitted: ({}) => void
};

class Feed extends Component<P> {
  state = {};

  onPostSubmit = content => {
    const { onPostSubmitted } = this.props;

    const post = {
      content
    };
    onPostSubmitted(post);
  };

  onLoad = () => {
    console.log(`main: ${this.main}`);
    this.main.scrollTop = this.main.scrollHeight;
    // this.main.scrollIntoView(false);
  };

  render() {
    return (
      <React.Fragment>
        <div
          style={{ height: '90%', overflow: 'scroll' }}
          ref={main => (this.main = main)}
        >
          <PostList onLoad={this.onLoad} />
        </div>
        <Divider />
        <div style={{ height: '10%' }}>
          <PostInput onSubmit={this.onPostSubmit} />
        </div>
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
