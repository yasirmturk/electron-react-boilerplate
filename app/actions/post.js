import postService from '../services/post';
import { enqueueSnackbar } from '.';

export const CREATEPOST = 'CREATEPOST';
export const GETFEED = 'GETFEED';

export const create = post => dispatch => {
  console.log(`create got ${post}`);
  postService.create(post).then(
    data => {
      console.log(`create callback ${data}`);
      dispatch({ type: CREATEPOST, success: true, payload: data.post });
    },
    error => {
      console.log(`create callback ${error}`);
      dispatch(
        enqueueSnackbar({ message: error, options: { variant: 'error' } })
      );
    }
  );
};

export const feed = () => dispatch => {
  console.log(`feed got `);
  postService.feed().then(
    data => {
      console.log(`feed callback ${data.feed.length}`);
      dispatch({ type: GETFEED, success: true, payload: data.feed });
    },
    error => {
      console.log(`feed callback ${error}`);
      dispatch(
        enqueueSnackbar({ message: error, options: { variant: 'error' } })
      );
    }
  );
};
