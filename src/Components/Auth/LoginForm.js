import React, {Component} from 'react';
import './LoginForm.css';
import firebase from "firebase";

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        this.sendSignInLink(this.state.value);
        event.preventDefault();
    }

    sendSignInLink(email) {
        const actionCodeSettings = {
            url: window.location, //@todo: best way?
            handleCodeInApp: true
        };

        firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
            .then(function() {
                window.localStorage.setItem('emailForSignIn', email);
            })
            .catch(function(error) {
                //@todo
            });
    }

    handleSignInLink() {
        if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                email = window.prompt('Please provide your email for confirmation');
            }

            firebase.auth().signInWithEmailLink(email, window.location.href)
                .then(function(result) {
                    window.localStorage.removeItem('emailForSignIn');

                    window.history.replaceState({}, "", "/"); //@todo
                })
                .catch(function(error) {
                    //@todo
                });
        }
    }

    componentDidMount() {
        this.handleSignInLink();
    }

    render() {
        return (
            <div className="auth">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email: <input type="email" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}
