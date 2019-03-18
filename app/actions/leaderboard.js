import leaderboardService from '../services/leaderboard';
import { enqueueSnackbar } from '.';

export const FOLLOWED = 'FOLLOWED';
export const UNFOLLOWED = 'UNFOLLOWED';
export const LEADERBOARD = 'LEADERBOARD';

export const follow = userId => dispatch => {
  console.log(`follow got ${userId}`);
  leaderboardService.follow(userId).then(
    res => {
      console.log(`follow callback ${res.leader.email}`);
      dispatch({ type: FOLLOWED, success: res.success, payload: res.leader });
    },
    error => {
      console.log(`follow callback ${error}`);
      dispatch(
        enqueueSnackbar({ message: error, options: { variant: 'error' } })
      );
    }
  );
};

export const unfollow = userId => dispatch => {
  console.log(`unfollow got ${userId}`);
  leaderboardService.unfollow(userId).then(
    res => {
      console.log(`unfollow callback ${res.leader.email}`);
      dispatch({ type: UNFOLLOWED, success: res.success, payload: res.leader });
    },
    error => {
      console.log(`unfollow callback ${error}`);
      dispatch(
        enqueueSnackbar({ message: error, options: { variant: 'error' } })
      );
    }
  );
};

export const current = () => dispatch => {
  console.log('current leaderboard ');
  leaderboardService.current().then(
    data => {
      console.log(`leaderboard callback ${JSON.stringify(data.success)}`);
      dispatch({
        type: LEADERBOARD,
        success: data.success,
        payload: data.topUsers
      });
    },
    error => {
      console.log(`leaderboard callback ${error}`);
      dispatch(
        enqueueSnackbar({ message: error, options: { variant: 'error' } })
      );
    }
  );
};
