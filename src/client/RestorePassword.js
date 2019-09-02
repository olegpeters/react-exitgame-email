import React from "react";
import './login.css';
import {browserHistory, Redirect} from "react-router";
import {withRouter} from "react-router-dom";

class RestorePasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "inkognito@securemail.com",
            birthdate: "01.01.1970",
            pet: "Cat",
            city: "Paris",
            errors: "",
            token: ""
        };
    }

    render() {
        const {email, pet, city, birthdate, errors, token} = this.state;
        if(token) {
            return (<Redirect to={"/mail?token="+token} />);
        } else {
            return (
                <div className="login">
                    <div className="wrapper fadeInDown">
                        <div id="formContent">
                            <img src="../public/SecureMail.jpg" height="45" alt="SecureMail" className="mt-5"/><br/>
                            <h2>Restore your login</h2>
                            <form onSubmit={this.handleSubmit}>
                                <input
                                    className="fadeIn second"
                                    name="email"
                                    type="text"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={this.handleChange}
                                />
                                <div className={"pt-3"}><h6>Your favourite pet</h6>
                                    <input
                                        className="fadeIn third"
                                        name="pet"
                                        type="text"
                                        placeholder="e.g. Dog"
                                        value={pet}
                                        onChange={this.handleChange}
                                    /></div>
                                <h6>Your date of birth</h6>
                                <input
                                    className="fadeIn third"
                                    name="birthdate"
                                    type="text"
                                    placeholder="e.g. 01/01/1970"
                                    value={birthdate}
                                    onChange={this.handleChange}
                                />
                                <h6>Your favourite city</h6>
                                <input
                                    className="fadeIn third"
                                    name="city"
                                    type="text"
                                    placeholder="e.g. New York"
                                    value={city}
                                    onChange={this.handleChange}
                                />
                                {errors && (
                                    <div className="text-white bg-danger my-2 p-3">{errors}</div>
                                )}
                                <button className="fadeIn fourth" type="submit">Restore login</button>
                            </form>
                        </div>
                    </div>
                </div>

            );
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        let answers = {
            email: this.state.email,
            pet: this.state.pet,
            city: this.state.city,
            birthdate: this.state.birthdate
        };
        let onfulfilled = (response) => {
            if(response.ok) {
                return response.text().then((function (text) {
                    this.props.history.push("/mail/?token="+text);
                    // this.setState({token: text});
                }).bind(this));
            } else {
                this.setState({errors: "Wrong restore data"});
            }
        };
        fetch('/api/forgotten', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(answers),
        }).then(onfulfilled.bind(this)).catch((error) => {
            this.setState({errors: "Wrong restore data"});
        });

    };
}

export default withRouter(RestorePasswordScreen)