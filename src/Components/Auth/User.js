import React, {Component} from 'react';
import './User.css';
import firebase from "firebase";

export default class User extends Component {
    handleSignInLink() {
        if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                email = window.prompt('Please provide your email for confirmation');
            }

            firebase.auth().signInWithEmailLink(email, window.location.href)
                .then(function(result) {
                    window.localStorage.removeItem('emailForSignIn');

                    // remove sign in with email link query string stuff
                    window.history.replaceState({}, "", "/"); //@todo: base URL?
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
                Welcome, {this.props.user.email}.
            </div>
        );
    }
}
