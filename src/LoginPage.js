import React from 'react';
import './LoginPage.css';
import * as Realm from "realm-web";

class FluidInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      value: ""
    };
  }

  focusField = () => {
    this.setState({ focused: !this.state.focused });
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    this.props.onChange(event);
  }

  render() {
    const { type, label, style, id } = this.props;
    const { focused, value } = this.state;

    let inputClass = "fluid-input";
    if (focused) {
      inputClass += " fluid-input--focus";
    } else if (value !== "") {
      inputClass += " fluid-input--open";
    }

    return (
      <div className={inputClass} style={style}>
        <div className="fluid-input-holder">
          <input 
            className="fluid-input-input"
            type={type}
            id={id}
            onFocus={this.focusField}
            onBlur={this.focusField}
            onChange={this.handleChange}
            autoComplete="off"
          />
          <label className="fluid-input-label" htmlFor={id}>{label}</label>
        </div>
      </div>
    );
  }
}

//Logout button
class Button extends React.Component {
  render() {
    return (
      <div className={`button ${this.props.buttonClass}`} onClick={this.props.onClick}>
        {this.props.buttonText}
      </div>
    );
  }
}

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '' //doesn't show until error occurs
    };
  }

  handleLogin = async () => {
    const { email, password } = this.state;
    const { client, onLogin } = this.props;

    const credential = Realm.Credentials.emailPassword(email, password);
    try {
      const user = await client.logIn(credential);
      localStorage.setItem('token', user.id);
      this.setState({ errorMessage: '' }); 
      onLogin(user); 
    } catch (err) {
      console.error('Login failed:', err.message);
      this.setState({ errorMessage: 'Login failed. Please check your email and password and try again.' });
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };


  //rendering Stuff
  render() {
    const { email, password, errorMessage } = this.state;
    const style = { margin: "15px 0" };
    return (
      <div className="login-container">
        <div className="title">Login</div>
        <FluidInput type="text" label="Email" id="email" value={email} style={style} onChange={this.handleChange} />
        <FluidInput type="password" label="Password" id="password" value={password} style={style} onChange={this.handleChange} />
        <Button buttonText="Log in" buttonClass="login-button" onClick={this.handleLogin} />
        {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Render error message */}
      </div>
    );
  }
}

export default LoginPage;
