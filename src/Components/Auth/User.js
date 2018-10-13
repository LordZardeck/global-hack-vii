import React, {Component} from 'react';
import './User.css';

export default class User extends Component {
    render() {
        return (
            <div className="auth">
                Welcome, {this.props.user.email}.
            </div>
        );
    }
}
