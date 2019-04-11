function set(user) {
  // add user to local storage
  localStorage.setItem('user', JSON.stringify(user));
}

function get() {
  const userStore = localStorage.getItem('user');
  const sth = userStore && JSON.parse(userStore);
  // console.log(`sth ${JSON.stringify(sth)}`);
  return sth && sth.user;
}

function clear() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  // eslint-disable-next-line no-restricted-globals
  location.reload(true);
}

export default { set, get, clear };
