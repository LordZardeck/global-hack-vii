import React, {Component} from 'react';
import Knowledgebase from "./Containers/Knowledgebase";
import {connect} from 'react-redux';
import {subscribeResources} from './redux/actions/knowledgebase';
import {withRouter} from "react-router";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Typography from "@material-ui/core/Typography/Typography";
import {withStyles} from "@material-ui/core";

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            main: '#0277BD'
        },
        background: {
            default: '#F5F5F5'
        }
    },
});

const styles = {
    appBar: {
        boxShadow: 'none'
    },
    headingLogo: {
        fontSize: '44px',
        fontWeight: '700',
        lineHeight: '52px',
        margin: '5px auto 4px'
    }
};

class App extends Component {
    componentDidMount() {
        this.props.subscribeResources();
    }

    render() {
        const {classes} = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                <div className="App">
                    <AppBar className={classes.appBar} position={"static"}>
                        <Typography color="inherit" className={classes.headingLogo}>enabl</Typography>
                    </AppBar>
                    <Grid container direction="column" justify="flex-start" alignItems="center">
                        <Knowledgebase/>
                    </Grid>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(withRouter(connect(null, {subscribeResources})(App)));
