import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import AppBar from "@material-ui/core/AppBar/AppBar";
import {withStyles} from "@material-ui/core";
import {withRouter} from "react-router";
import {ArrowBack} from "@material-ui/icons";

const styles = theme => ({
    root: {
        paddingBottom: '30px'
    },
    appBar: {
        boxShadow: 'none',
        flexDirection: 'row',
        position: 'relative'
    },
    headingLogo: {
        fontSize: '44px',
        fontWeight: '700',
        lineHeight: '52px',
        margin: '5px auto 4px'
    },
    backButton: {
        color: 'white',
        top: '50%',
        transform: 'translateY(-50%)',
        left: '10px',
        position: 'absolute'
    },
    backButtonIcon: {
        width: '26px',
        height: '26px'
    }
});


class MenuBar extends Component {
    render() {
        const {classes, history, showBack} = this.props;
        return (
            <AppBar className={classes.appBar} position={"static"}>
                {
                    showBack &&
                    <button className={classes.backButton} onClick={history.goBack}>
                        <ArrowBack className={classes.backButtonIcon}/>
                    </button>
                }
                <Typography color="inherit" className={classes.headingLogo}>enabl</Typography>
            </AppBar>
        );
    }
}

export default withRouter(withStyles(styles)(MenuBar));

