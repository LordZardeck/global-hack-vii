import React, {Component} from 'react';
import './Auth.css';
import firebase from "firebase";
import LoginForm from "./LoginForm";
import User from "./User";
import UserInfo from "./UserInfo";

export default class Auth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user
        };
    }

    loadUserDetails(uid) {
        let that = this;

        return firebase.firestore().collection('users').doc(uid).get().then(userDoc => {
            console.log(userDoc.data());
            that.setState({user: userDoc.data()});
        });
    }

    componentDidMount() {
        if(this.props.user !== null) {
            this.loadUserDetails(this.props.user.uid);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.user === null || this.props.user.uid !== nextProps.user.uid) {
            this.loadUserDetails(nextProps.user.uid);
        }

        return true;
    }

    render() {
        let userComponent = <LoginForm />;

        if(this.state.user !== null) {
            if(this.props.user.userPopulated === true) {
                userComponent = <User user={this.state.user} />;
            } else {
                userComponent = <UserInfo user={this.state.user} />
            }
        }

        return (
            <div className="auth">
                {userComponent}
            </div>
        );
    }
}
