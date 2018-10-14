import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import VisaType from './Screens/VisaType';
import ImmigrantType from './Screens/ImmigrantType';
import SpeakEnglish from './Screens/SpeakEnglish';
import Skills from './Screens/Skills';
import Residency from './Screens/Residency';
import PersonalInformation from './Screens/PersonalInformation';
import {populateUser} from "../../redux/actions/user";
import {connect} from "react-redux";
import {Redirect} from "react-router";

const styles = theme => ({
    root: {
        backgroundColor: 'none',
        [theme.breakpoints.up('md')]: {

        },
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
});

class Registration extends Component {
    state = {
        activeStep: 0,
        spacing: 16,
        formSubmitted: false
    };

    constructor(props) {
        super(props);
        this.stepRefs = {
            0: React.createRef(),
            1: React.createRef(),
            2: React.createRef(),
            3: React.createRef(),
            4: React.createRef(),
            5: React.createRef()
        };
    }

    getStepContent = (step) => {
        switch (step) {
            case 0:
                return <ImmigrantType innerRef={this.stepRefs[0]} />;
            case 1:
                return <VisaType innerRef={this.stepRefs[1]} />;
            case 2:
                return <SpeakEnglish innerRef={this.stepRefs[2]} />;
            case 3:
                return <Skills innerRef={this.stepRefs[3]} />;
            case 4:
                return <Residency innerRef={this.stepRefs[4]} />;
            case 5:
                return <PersonalInformation innerRef={this.stepRefs[5]} />;
            default:
                return 'Unknown step';
        }
    };

    getSteps = () => {
        return [
            'I am a...',
            'What is your visa type?',
            'Do you speak english?',
            'My skills are...',
            'Are you seeking permanent residency?',
            'Personal Information'
        ];
    };

    handleSubmit(userId, formData) {
        populateUser(userId, {...formData, userPopulated: true}).then(() => this.setState({formSubmitted: true}));
    }

    handleChange = key => (event, value) => {
        this.setState({
            [key]: value,
        });
    };

    handleNext() {
        let stepContent = '';
        let currentChild = this.stepRefs[this.state.activeStep].current;

        if (currentChild !== null && typeof currentChild.getStepState === 'function') {
            stepContent = currentChild.getStepState();
        }

        this.setState(state => {
            const newState = {
                activeStep: state.activeStep + 1,
                formData: {...state.formData, ...stepContent}
            };

            if (this.state.activeStep === 5) {
                this.handleSubmit(this.props.authUser.uid, newState.formData);
            }

            return newState;
        });
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    render() {
        const { classes, currentUser } = this.props;
        const { activeStep, spacing, formSubmitted } = this.state;
        const steps = this.getSteps();

        if(formSubmitted || (currentUser !== null && currentUser.userPopulated === true)) {
            return <Redirect to="/"/>
        }

        return (
            <Grid container justify="center" className={classes.root} spacing={spacing}>
                <Grid item xs={12} md={8} lg={6}>
                    <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((label, index) => {
                            return (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                    <StepContent>
                                        {this.getStepContent(index)}
                                        <div className={classes.actionsContainer}>
                                            <div>
                                                <Button
                                                    disabled={activeStep === 0}
                                                    onClick={this.handleBack}
                                                    className={classes.button}
                                                >
                                                    Back
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => this.handleNext()}
                                                    className={classes.button}
                                                >
                                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                </Button>
                                            </div>
                                        </div>
                                    </StepContent>
                                </Step>
                            );
                        })}
                    </Stepper>
                    </form>
                    {activeStep === steps.length && (
                        <Paper square elevation={0} className={classes.resetContainer}>
                            <Typography>All steps completed - you&quot;re finished</Typography>
                            <Button onClick={this.handleReset} className={classes.button}>
                                Reset
                            </Button>
                        </Paper>
                    )}
                </Grid>
            </Grid>
        );
    }
}

Registration.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(connect(state => ({...state.user}))(Registration));
