import leaderboardService from '../services/leaderboard';
import { snackError } from '.';

export const FOLLOWED = 'FOLLOWED';
export const UNFOLLOWED = 'UNFOLLOWED';
export const LEADERBOARD = 'LEADERBOARD';

export const follow = userId => dispatch => {
  console.log(`follow got ${userId}`);
  return leaderboardService.follow(userId).then(
    data => {
      console.log(`follow callback ${data.leader.email}`);
      dispatch({ type: FOLLOWED, success: data.success, payload: data.leader });
      return data;
    },
    error => {
      console.log(`follow error ${error}`);
      dispatch(snackError(error));
    }
  );
};

export const unfollow = userId => dispatch => {
  console.log(`unfollow got ${userId}`);
  return leaderboardService.unfollow(userId).then(
    data => {
      console.log(`unfollow callback ${data.leader.email}`);
      dispatch({
        type: UNFOLLOWED,
        success: data.success,
        payload: data.leader
      });
      return data;
    },
    error => {
      console.log(`unfollow error ${error}`);
      dispatch(snackError(error));
    }
  );
};

export const current = () => dispatch => {
  console.log('current leaderboard ');
  return leaderboardService.current().then(
    data => {
      console.log(`leaderboard callback ${JSON.stringify(data.success)}`);
      dispatch({
        type: LEADERBOARD,
        success: data.success,
        payload: data.topUsers
      });
      return data;
    },
    error => {
      console.log(`leaderboard error ${error}`);
      dispatch(snackError(error));
    }
  );
};
