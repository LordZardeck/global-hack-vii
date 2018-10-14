import React, {Component} from 'react';
import {connect} from 'react-redux';
import Card from "../Components/Knowledgebase/Resource/Card";
import {Route, Switch, withRouter} from "react-router";
import Details from "../Components/Knowledgebase/Resource/Details";
import {Link} from "react-router-dom";
import {withStyles} from "@material-ui/core";

const styles = {
    root: {
        width: '100%'
    }
};

class Knowledgebase extends Component {
    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
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

export default withStyles(styles)(withRouter(connect(state => ({...state.knowledgebase}))(Knowledgebase)));
