import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink, Route, Switch} from "react-router-dom";

class Immigrant extends Component {
    render() {
        return (
            <div className="registration-immigrant">
                <Switch>
                    {/* Route here for each immigrant registration component */}
                </Switch>
            </div>
        );
    }
}

export default connect()(Immigrant);
