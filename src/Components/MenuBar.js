import React, { Component } from 'react';
import Back from "./Back";
import Typography from "@material-ui/core/Typography/Typography";
import AppBar from "@material-ui/core/AppBar/AppBar";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    root: {
        paddingBottom: '30px'
    },
    appBar: {
        boxShadow: 'none'
    },
    headingLogo: {
        fontSize: '44px',
        fontWeight: '700',
        lineHeight: '52px',
        margin: '5px auto 4px'
    }
});


class MenuBar extends Component {
    render() {
        const {classes} = this.props;
        return (
            <AppBar className={classes.appBar} position={"static"}>
                {this.props.showBack && <Back/>}
                <Typography color="inherit" className={classes.headingLogo}>enabl</Typography>
            </AppBar>
        );
    }
}

export default withStyles(styles)(MenuBar);

