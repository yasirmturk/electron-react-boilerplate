import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Register from '../components/Register';
import * as RegisterActions from '../actions/user';

const mapStateToProps = state => ({
  authenticated: state.user.isAuth
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(RegisterActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
