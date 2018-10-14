import React, {Component} from 'react';
import './LoginForm.css';
import firebase from "firebase";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import arch from'../../arch.png'
import {connect} from "react-redux";
import {Redirect} from "react-router";


const styles = theme => ({
    root: {
        paddingLeft: '20px',
        paddingRight: '20px'
    },

    coverImage:{
        background:'#2288C5',
        opacity:'0.6',
        zIndex:'-10',
        top:'0',
        left:'0',
        height:'100vh',
        width:'100vw',
        position:'absolute',
    },

    backgroundImage:{
        background:'black',
        backgroundImage:'url(' + arch + ')',
        backgroundAttachment: 'fixed',
        backgroundSize:'cover',
        backgroundPosition:'center',
        zIndex:'-20',
        top:'0',
        left:'0',
        height:'100vh',
        width:'100vw',
        position:'absolute',

    },

    largeTitle:{
        fontSize:'100px',
        fontWeight:'900',
        marginTop:'27vh',
        color:'white',
        fontFamily:'Roboto',
        textAlign:'center',

    },

    smallTitle:{
        fontSize:'24px',
        color:'white',
        fontFamily:'Roboto',
        textAlign:'center',
    },

    continueButton:{
        background:'#2CB742',
        width:'100%',
        padding:'20px',
        borderRadius:'30px',
        color:'white',
        fontWeight:'900',
        fontSize:'18px',
        border:'none',
    },

    outerContainer:{
        width:'100%',
        padding:'5%',
    },

    emailInput:{
        width:'100%',
        background:'#ffffff33',
        borderRadius:'30px',
        padding:'20px',
        border:'none',
        fontSize:'14px',
        color:'white',
        marginBottom:'10px',
        marginTop:'60px',
    },

    checkEmail:{
        marginTop:'60px',
        padding:'20px',
    }
    ,

    'emailInput::focus':{
        outline:'none',
    },

    'continueButton::focus':{
        outline:'none',
    },

    'emailInput::placeholder':{
        color:'#ffffff',
    }
})

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailValue: '',
            emailSent: false,
            page:0,
        };

    }

    handleChange = (event) => {
        this.setState({emailValue: event.target.value});
    };

    handleSubmit = (event) => {
        this.sendSignInLink(this.state.emailValue);
        event.preventDefault();
    };

    sendSignInLink(email) {
        let that = this;

        const actionCodeSettings = {
            url: window.location.href, //@todo: best way?
            handleCodeInApp: true
        };

        firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
            .then(function() {
                window.localStorage.setItem('emailForSignIn', email);

                that.setState({emailSent: true});
            })
            .catch(function(error) {
                console.error(error.code);
            });
    }

    render() {
        const { classes, authUser } = this.props;

        if(authUser !== null) {
            return <Redirect to="/"/>
        }

        return (
            <div className={classes.root}>
                <div className={classes.coverImage}/>
                <div className={classes.backgroundImage}/>
                <div className={classes.largeTitle}>enabl</div>
                <div className={classes.smallTitle}>St. Louis, Missouri</div>
                <div className={classes.auth}>
                    {!this.state.emailSent ? (
                        <form onSubmit={this.handleSubmit}>
                            <input className={classes.emailInput} type="email" placeholder="Enter your email" value={this.state.emailValue} onChange={this.handleChange} />
                            <button className={classes.continueButton} type="submit">Continue</button>
                        </form>
                    ) : (
                        <Paper className={classes.checkEmail}>Check your email for authorization link.</Paper>
                    )}
                </div>
            </div>
        );
    }
}

LoginForm.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(connect(state => ({...state.user}))(LoginForm));
