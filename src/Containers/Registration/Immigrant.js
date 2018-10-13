import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink, Route, Switch} from "react-router-dom";
import IAmType from "../../Components/Registration/Immigrant/IAmType";
import VisaType from "../../Components/Registration/Immigrant/VisaType";

class Immigrant extends Component {

    render() {
        return (
            <div className="registration-immigrant">
                <Switch>
                    {/* Route here for each immigrant registration component */}
                    <Route exact="/" component={IAmType}/>
                </Switch>
            </div>
        );
    }
}

export default connect()(Immigrant);
