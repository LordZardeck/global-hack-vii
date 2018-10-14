import React, {Component} from 'react';
import {connect} from 'react-redux';
import {subscribeResources} from './redux/actions/knowledgebase';
import {Redirect, Route, Switch, withRouter} from "react-router";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Typography from "@material-ui/core/Typography/Typography";
import {withStyles} from "@material-ui/core";
import LoginForm from "./Components/Auth/LoginForm";
import firebase from "firebase";
import {createUser, subscribeAuthStateChange} from './redux/actions/user';
import Registration from "./Containers/Registration/Registration";
import Card from "./Components/Knowledgebase/Resource/Card";
import Details from "./Components/Knowledgebase/Resource/Details";
import Dashboard from "./Containers/Dashboard";
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

        this.wireUserAuthChange();
    }


    wireUserAuthChange() {
        if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
            let email = window.localStorage.getItem('emailForSignIn');

            if (!email) {
                email = window.prompt('Please provide your email for confirmation');
            }

            firebase.auth().signInWithEmailLink(email, window.location.href)
                .then(({additionalUserInfo, user}) => {
                    window.localStorage.removeItem('emailForSignIn');
                    // remove sign in with email link query string stuff
                    window.history.replaceState({}, "", "/"); //@todo: base URL?

                    if (additionalUserInfo.isNewUser) {
                        return this.createUser(user.uid);
                    }
                })
                .catch(({code}) => console.error(code));
        }
    }

    componentDidMount() {
        this.props.subscribeResources();
        this.props.subscribeAuthStateChange();

        this.wireUserAuthChange();
    }

    isLoggedIn() {
        return this.props.authUser !== null;
    }

    isRegistered() {
        return this.props.currentUser !== null && this.props.currentUser.userPopulated === true;
    }

    render() {
        const {classes, resources} = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                <div className={classes.root}>
                    {
                        <MenuBar/>
                    }
                    {
                        this.props.sessionInitialized && this.props.userInitialized &&
                        <Grid container direction="column" justify="flex-start" alignItems="stretch">
                            <Switch>
                                <Route path="/login" component={LoginForm}/>
                                <Route path="/registration" component={Registration}/>
                                <Route exact path="/" component={Dashboard}/>
                                <Route path="/knowledgebase/view/:id" render={props => <Details {...props}/>}/>
                            </Switch>
                            {
                                (!this.isLoggedIn())
                                    ? <Redirect to="/login"/>
                                    : <React.Fragment/>
                            }
                            {
                                (this.isLoggedIn() && !this.isRegistered())
                                    ? <Redirect to="/registration"/>
                                    : <React.Fragment/>
                            }
                        </Grid>
                    }
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(withRouter(connect(state => ({...state.user, ...state.knowledgebase}), {
    subscribeResources,
    subscribeAuthStateChange,
    createUser
})(App)));
