import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { signIn, signUp } from '../api/auth'
import Button from './Button'


class SignInPage extends Component {
  state = {
    signUp: false
  }

  onFormClick = (e) => {
    e.preventDefault()
    const elements = e.target.elements
    const data = {
      user: {
        email: elements.email.value,
        password: elements.password.value
      }
    }
    if (this.state.signUp) {
      data.user.password_confirmation = elements.passwordConfirmation.value
      return signUp(data)
      .then((res) => this.props.onSignInResponse(res))
    }
    else {
      return signIn(data)
      .then((res) => this.props.onSignInResponse(res))
    }

  }

  onClick = () => {
    this.setState({ signUp: !this.state.signUp })
  }

  render() {
    const { signedIn } = this.props
    const { signUp } = this.state

    if (signedIn) {return <Redirect to="/app" />}
    return (
      <Fragment>
        <form onSubmit={this.onFormClick}>
          <div className="form-label">
          <label>
            {'Email: '}
            <input
                type='email'
                name='email'
                defaultValue=""
            />
          </label>
          </div>
          <div className="form-label">
          <label>
            {'Password: '}
            <input
                type='password'
                name='password'
                defaultValue=""
            />
          </label>
          </div>
          { signUp &&
            <div className="form-label">
            <label >
              {'Re-type Password: '}
              <input
                  type='password'
                  name='passwordConfirmation'
                  defaultValue=""
              />
            </label>
            </div>
          }
          <br />
          <Button New>Sign {signUp && 'Up'} {!signUp && 'In'}</Button>
        </form>
        <Button Route onClick={ this.onClick }>{signUp && 'Back to Sign In'} {!signUp && 'Sign Up'}</Button>
      </Fragment>
    )
  }
}

export default SignInPage
