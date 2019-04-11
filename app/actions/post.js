import postService from '../services/post';
import { snackError } from '.';

export const CREATEPOST = 'CREATEPOST';
export const GETFEED = 'GETFEED';

export const create = post => dispatch => {
  console.log(`create got ${post}`);
  return postService.create(post).then(
    data => {
      console.log(`create callback ${data}`);
      dispatch({ type: CREATEPOST, success: true, payload: data.post });
      return data;
    },
    error => {
      console.log(`create error ${error}`);
      dispatch(snackError(error));
    }
  );
};

export const feed = () => dispatch => {
  console.log(`feed got `);
  return postService.feed().then(
    data => {
      console.log(`feed callback ${data.feed.length}`);
      dispatch({ type: GETFEED, success: true, payload: data.feed });
      return data;
    },
    error => {
      console.log(`feed error ${error}`);
      dispatch(snackError(error));
    }
  );
};
