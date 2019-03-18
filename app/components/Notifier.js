/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import * as SnackActions from '../actions';

class Notifier extends Component {
  shouldComponentUpdate({ notifications: newSnacks = [] }) {
    const { notifications: currentSnacks } = this.props;
    let notExists = false;
    for (let i = 0; i < newSnacks.length; i += 1) {
      // if (notExists) continue;
      notExists =
        notExists ||
        !currentSnacks.filter(({ key }) => newSnacks[i].key === key).length;
    }
    return notExists;
  }

  componentDidUpdate() {
    const { notifications = [], enqueueSnackbar, removeSnackbar } = this.props;

    notifications.forEach(notification => {
      // Do nothing if snackbar is already displayed
      if (this.displayed.includes(notification.key)) return;
      // Display snackbar using notistack
      enqueueSnackbar(notification.message, notification.options);
      // Keep track of snackbars that we've displayed
      this.storeDisplayed(notification.key);
      // Dispatch action to remove snackbar from redux store
      removeSnackbar(notification.key);
    });
  }

  displayed = [];

  storeDisplayed = id => {
    this.displayed = [...this.displayed, id];
  };

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  notifications: state.notifier.notifications
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(SnackActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Notifier));
