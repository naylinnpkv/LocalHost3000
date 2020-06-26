import React, { Component } from "react";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      usernameInputField: '',
      passwordInputField: '',
      errorMessage: ''
    }
    this.handleUsernameInputField = this.handleUsernameInputField.bind(this);
    this.handlePasswordInputField = this.handlePasswordInputField.bind(this);
    this.handleSubmitButton = this.handleSubmitButton.bind(this);
  }
  handleUsernameInputField(e) {
    this.setState({usernameInputField: e.target.value})
  }
  handlePasswordInputField(e) {
    this.setState({passwordInputField: e.target.value})
  }
  handleSubmitButton(e) {
    console.log('call to submit button')
    let url = 'http://localhost:8080/api/login';
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.usernameInputField,
        password: this.state.passwordInputField,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.props.addCurrentUser(data);
        this.props.history.push('/');
      })
      .catch((err) => {
        console.warn(err);
        this.setState({errorMessage: 'sorry, we could not process your username and password'})
        
      });
    this.setState({usernameInputField: '', passwordInputField: ''});
    e.preventDefault();
  }
  render() {
    return (
      <main>
        <h1>Login</h1>
        <form id='loginForm'>
          <div>
            <input placeholder='username' name='usernameInputField' value={this.state.usernameInputField} onChange={this.handleUsernameInputField}>
            </input>
          </div>
            <input placeholder='password' name='passwordInputField' value={this.state.passwordInputField} onChange={this.handlePasswordInputField}>
            </input>
          <div>
            <button form='loginForm' type='submit'  value='Submit' onClick={this.handleSubmitButton}>
              Submit
            </button>
          </div>
          <div>
            <p>{this.state.errorMessage}</p>
          </div>
        </form>
      </main>
    )
  }
}

export default Login;
