import React, {Component} from 'react';
import {connect} from 'react-redux';
import Card from "../Components/Knowledgebase/Resource/Card";
import {Route, Switch, withRouter} from "react-router";
import Details from "../Components/Knowledgebase/Resource/Details";
import {Link} from "react-router-dom";

class Knowledgebase extends Component {
    render() {
        return (
            <div className="knowledgebase">
                <Switch>
                    <Route path="/knowledgebase/list"
                           render={
                               () => Object.keys(this.props.resources)
                                   .map(resourceId => <Card key={resourceId}
                                                            resource={this.props.resources[resourceId]}/>)
                           }/>
                    <Route path="/knowledgebase/view/:id" render={props => <Details {...props}/>}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(state => ({...state.knowledgebase}))(Knowledgebase));
