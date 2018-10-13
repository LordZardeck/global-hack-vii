import React, {Component} from 'react';
import './App.css';
import Knowledgebase from "./Containers/Knowledgebase";
import {connect} from 'react-redux';
import {subscribeGoals} from './redux/actions/goals';

class App extends Component {
    componentDidMount() {
        this.props.subscribeGoals();
    }

    render() {
        return (
            <div className="App">
                <Knowledgebase/>
            </div>
        );
    }
}

export default connect(null, {subscribeGoals})(App);
