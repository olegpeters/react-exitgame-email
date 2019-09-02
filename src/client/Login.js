import React from "react";
import './login.css';
import {Link} from "react-router-dom";

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  render() {
    const { email, password, errors } = this.state;
    return (
        <div className="login">
        <div className="wrapper">
            <div id="formContent">
                <div className="fadeIn first pt-5">
                    <img src="../public/SecureMail.jpg" id="icon" alt="SecureMail"/>
                    <h1>SecureMail</h1><br/> The most secure e-mail service in the world
                </div>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <input
                        className="fadeIn second"
                        name="email"
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={this.handleChange}
                    />
                    <input
                        className="fadeIn third"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={this.handleChange}
                    />
                    {errors && (
                        <div className="text-white bg-danger my-2 p-3">{errors}</div>
                    )}
                    <button className="fadeIn fourth" type="submit">Log In</button>
                </form>

                <div id="formFooter">
                    <Link className="underlineHover" to={'/forgotten'}>Forgot Password?</Link>
                </div>

            </div>
        </div>
        </div>
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
      event.preventDefault();
    this.setState({errors: "Wrong login data"});
  };
}
