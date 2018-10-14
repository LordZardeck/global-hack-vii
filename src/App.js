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
import LoginForm from "./Components/Auth/LoginForm";
import firebase from "firebase";
import User from './redux/actions/user';
import Registration from "./Containers/Registration/Registration";
import MenuBar from './Components/MenuBar'

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

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authUser: null,
            user: null
        };
    }


    wireUserAuthChange() {
        let that = this;

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                that.setState({
                    authUser: user
                });
            } else {
                that.setState({
                    authUser: null
                });
            }
        });

        if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                email = window.prompt('Please provide your email for confirmation');
            }

            firebase.auth().signInWithEmailLink(email, window.location.href)
                .then(function(result) {
                    if(result.additionalUserInfo.isNewUser) {
                        User.createUser(result.user.uid);
                    }

                    window.localStorage.removeItem('emailForSignIn');

                    // remove sign in with email link query string stuff
                    window.history.replaceState({}, "", "/"); //@todo: base URL?
                })
                .catch(function(error) {
                    console.error(error.code);
                });
        }
    }

    loadUserDetails(uid) {
        let that = this;

        return firebase.firestore().collection('users').doc(uid).get().then(userDoc => {
            that.setState({user: userDoc.data()});
        });
    }

    componentDidMount() {
        this.props.subscribeResources();

        this.wireUserAuthChange();

        if(this.state.authUser !== null) {
            this.loadUserDetails(this.state.authUser.uid);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextState.authUser === null) {
            return true; // no user incoming
        }

        if (this.state.authUser === null || this.state.authUser.uid !== nextState.authUser.uid) {
            this.loadUserDetails(nextState.authUser.uid);
        }

        return true;
    }

    render() {
        const {classes} = this.props;
        let component = <LoginForm />;

        if(this.state.authUser !== null) {
            component = <Registration authUser={this.state.authUser} user={this.state.user} />;

            if(this.state.user !== null && this.state.user.userPopulated === true) {
                component = <Knowledgebase/>;
            }
        }

        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                <div className={classes.root}>
                    {
                        <MenuBar/>
                    }
                    <Grid container direction="column" justify="flex-start" alignItems="center">
                        {component}
                    </Grid>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(withRouter(connect(null, {subscribeResources})(App)));
