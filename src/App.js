import React, {Component} from 'react';
import './App.css';
import Knowledgebase from "./Containers/Knowledgebase";
import {connect} from 'react-redux';
import {subscribeResources} from './redux/actions/knowledgebase';
import {withRouter} from "react-router";

class App extends Component {
    componentDidMount() {
        this.props.subscribeResources();
    }

    render() {
        return (
            <div className="App">
                <Knowledgebase/>
            </div>
        );
    }
}

export default withRouter(connect(null, {subscribeResources})(App));
