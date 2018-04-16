import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { registerUser } from '../../actions/authentication';

import RegisterPage from './RegisterPage';

export class RegisterPageContainer extends React.Component {
  constructor(props) {
    super(props);

    // bound functions
    this.registerFunction = this.registerFunction.bind(this);
  }

  registerFunction(userData) {
    const { dispatch } = this.props;
    dispatch(registerUser(userData));
  }

  render() {
    const {isLoggedIn,registrationSucceeded}= this.props.authentication

    if (registrationSucceeded){
      return (
        <Redirect to='/account/registration-success'/>
      )
    }

    if (isLoggedIn) {
        return (<p>Please loug out before reigstiering a new user</p>)
      }
      return <RegisterPage registerFunction={this.registerFunction} />;
  }
}

const mapStateToProps = state => ({ authentication: state.authentication });

export default connect(mapStateToProps)(RegisterPageContainer);