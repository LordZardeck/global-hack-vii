import React, {Component} from 'react';
import './User.css';
import firebase from "firebase";

export default class User extends Component {
    render() {
        return (
            <div className="auth">
                Welcome, {this.props.user.email}.
            </div>
        );
    }
}
