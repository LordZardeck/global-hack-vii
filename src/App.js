import React, {Component} from 'react';
import './App.css';
import Knowledgebase from "./Containers/Knowledgebase";
import Auth from "./Components/Auth/Auth";
import {connect} from 'react-redux';
import {subscribeResources} from './redux/actions/knowledgebase';
import firebase from "firebase";
import User from './redux/actions/user';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    wireUserAuthChange() {
        let that = this;

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                that.setState({
                    user: user
                });
            } else {
                that.setState({
                    user: null
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

    componentDidMount() {
        this.props.subscribeResources();

        this.wireUserAuthChange();
    }

    render() {
        return (
            <div className="App">
                <Auth user={this.state.user} />
                {this.state.user !== null &&
                    <Knowledgebase/>
                }
            </div>
        );
    }
}

export default connect(null, {subscribeResources})(App);
