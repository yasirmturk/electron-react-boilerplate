import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from '../components/Login';
import * as LoginActions from '../actions/user';

const mapStateToProps = state => ({
  authenticated: state.user.isAuth
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LoginActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
