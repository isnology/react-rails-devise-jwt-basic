import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { signOut } from './api/auth'
import { getDecodedToken } from './api/token'
import  SignInPage  from './components/SignInPage'
import  SignedInPage  from './components/SignedInPage'


class App extends Component {
  state = {
    user: getDecodedToken()
  }

  onSignOut = () => {
    signOut()
    .then((res) => {
      this.setState({ user: null })
    })
    .catch((error) => {
      res.status(404).json(error)
    })
  }

  onSignInResponse = (data) => {
    this.setState({ user: data })
  }

  render() {
    const { user } = this.state
    const signedIn = !!user

    return (
        <Router>
          <div className="App">
            <Switch>

              <Route path='/' exact render={ () => (
                  <SignInPage signedIn={ signedIn } onSignInResponse={ this.onSignInResponse }/>
              )}/>

              <Route path='/app' exact render={ () => (
                  <SignedInPage signedIn={ signedIn } onSignOut={ this.onSignOut } />
              )}/>

            </Switch>
          </div>
        </Router>
    )
  }

  componentWillMount() {

  }
}

export default App
