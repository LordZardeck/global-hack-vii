import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter} from "react-router";
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

            </div>
        );
    }
}

export default withStyles(styles)(withRouter(connect(state => ({...state.knowledgebase}))(Knowledgebase)));
