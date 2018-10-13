import React, {Component} from 'react';
import './App.css';
import Knowledgebase from "./Containers/Knowledgebase";
import LoginForm from "./Components/Auth/LoginForm";
import {connect} from 'react-redux';
import {subscribeResources} from './redux/actions/knowledgebase';
import firebase from "firebase";
import User from './redux/actions/user';
import {withRouter} from "react-router";
import UserInfo from "./Components/Auth/UserInfo";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authUser: null,
            user: null
        };
    }

    wireUserAuthChange() {
        let that = this;

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                that.setState({
                    authUser: user
                });
            } else {
                that.setState({
                    authUser: null
                });
            }
        });

        if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                email = window.prompt('Please provide your email for confirmation');
            }

            firebase.auth().signInWithEmailLink(email, window.location.href)
                .then(function(result) {
                    if(result.additionalUserInfo.isNewUser) {
                        User.createUser(result.user.uid);
                    }

                    window.localStorage.removeItem('emailForSignIn');

                    // remove sign in with email link query string stuff
                    window.history.replaceState({}, "", "/"); //@todo: base URL?
                })
                .catch(function(error) {
                    console.error(error.code);
                });
        }
    }

    loadUserDetails(uid) {
        let that = this;

        return firebase.firestore().collection('users').doc(uid).get().then(userDoc => {
            that.setState({user: userDoc.data()});
        });
    }

    componentDidMount() {
        this.props.subscribeResources();

        this.wireUserAuthChange();

        if(this.state.authUser !== null) {
            this.loadUserDetails(this.state.authUser.uid);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if( this.state.authUser === null || this.state.authUser.uid !== nextState.authUser.uid) {
            this.loadUserDetails(nextState.authUser.uid);
        }

        return true;
    }

    render() {
        let component = <LoginForm />;

        if(this.state.authUser !== null) {
            if(this.state.user !== null && this.state.user.userPopulated === true) {
                component = <Knowledgebase/>;
            } else {
                component = <UserInfo authUser={this.state.authUser} user={this.state.user} />;
            }
        }

        return (
            <div className="App">
                {component}
            </div>
        );
    }
}

export default withRouter(connect(null, {subscribeResources})(App));
