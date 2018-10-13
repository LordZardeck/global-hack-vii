import React, {Component} from 'react';
import './Auth.css';
import LoginForm from "./LoginForm";
import User from "./User";
import UserInfo from "./UserInfo";

export default class Auth extends Component {
    render() {
        let userComponent = <LoginForm />;

        if(this.props.user !== null) {
            if(this.props.user.userPopulated === true) {
                userComponent = <User authUser={this.props.authUser} user={this.props.user} />;
            } else {
                userComponent = <UserInfo  />
            }
        }

        return (
            <div className="auth">
                {userComponent}
            </div>
        );
    }
}
