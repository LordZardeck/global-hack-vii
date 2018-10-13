import React, {Component} from 'react';
import './LoginForm.css';
import firebase from "firebase";

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailValue: '',
            emailSent: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({emailValue: event.target.value});
    }

    handleSubmit(event) {
        this.sendSignInLink(this.state.emailValue);
        event.preventDefault();
    }

    sendSignInLink(email) {
        let that = this;

        const actionCodeSettings = {
            url: window.location.href, //@todo: best way?
            handleCodeInApp: true
        };

        firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
            .then(function() {
                window.localStorage.setItem('emailForSignIn', email);

                that.setState({emailSent: true});
            })
            .catch(function(error) {
                console.error(error.code);
            });
    }

    render() {
        return (
            <div className="auth">
                {!this.state.emailSent ? (
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Email: <input type="email" value={this.state.emailValue} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                ) : (
                    <p>Check your email for authorization link.</p>
                )}
            </div>
        );
    }
}
