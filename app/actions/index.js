export const ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR';
export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';

export const snack = m =>
  enqueueSnackbar({ message: typeof m === 'string' ? m : '' });

export const snackError = m =>
  enqueueSnackbar({
    message: typeof m === 'string' ? m : 'Unknown error occured!',
    options: { variant: 'error' }
  });

export const enqueueSnackbar = notif => ({
  type: ENQUEUE_SNACKBAR,
  notification: { key: new Date().getTime() + Math.random(), ...notif }
});

export const removeSnackbar = key => ({ type: REMOVE_SNACKBAR, key });
