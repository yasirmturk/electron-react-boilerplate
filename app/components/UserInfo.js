import React, { memo } from 'react';

import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

// UserInfo component
function UserInfo({ user, showFollowers }) {
  // Typography attributes
  const styleProps = {
    variant: 'subtitle1',
    inline: true,
    style: { marginRight: 8 }
  };

  return (
    <React.Fragment>
      <Typography color="primary" {...styleProps}>
        {user.fullname}
      </Typography>
      <Typography color="textSecondary" {...styleProps}>
        @{user.username}
      </Typography>
      {showFollowers && (
        <Typography variant="subtitle2" inline>
          {user.followerCount} Followers
        </Typography>
      )}
    </React.Fragment>
  );
}

const withClick = Component => props => {
  const { user, onClick } = props;
  return onClick ? (
    <ButtonBase onClick={() => onClick(user)}>
      <Component {...props} />
    </ButtonBase>
  ) : (
    <Component {...props} />
  );
};

export default memo(withClick(UserInfo));
