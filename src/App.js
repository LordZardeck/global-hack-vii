import React, {Component} from 'react';
import './App.css';
import Knowledgebase from "./Containers/Knowledgebase";
import Auth from "./Components/Auth/Auth";
import {connect} from 'react-redux';
import {subscribeGoals} from './redux/actions/goals';
import firebase from "firebase";

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
    }

    componentDidMount() {
        this.props.subscribeGoals();

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

export default connect(null, {subscribeGoals})(App);
