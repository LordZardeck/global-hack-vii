import React, {Component} from 'react';
import './Auth.css';
import firebase from "firebase";
import LoginForm from "./LoginForm";
import User from "./User";

export default class Auth extends Component {

    render() {
        return (
            <div className="auth">
                {this.props.user !== null ? (
                    <User user={this.props.user} />
                ) : (
                    <LoginForm />
                )}
            </div>
        );
    }
}
