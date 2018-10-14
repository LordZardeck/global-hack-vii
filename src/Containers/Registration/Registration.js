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
import User from "../../redux/actions/user";

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

function getSteps() {
    return [
        'I am a...',
        'What is your visa type?',
        'Do you speak english?',
        'My skills are...',
        'Are you seeking permanent residency?',
        'Personal Information'
    ];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return <ImmigrantType />;
        case 1:
            return <VisaType />;
        case 2:
            return <SpeakEnglish />;
        case 3:
            return <Skills />;
        case 4:
            return <Residency />;
        case 5:
            return <PersonalInformation />;
        default:
            return 'Unknown step';
    }
}

class Registration extends Component {
    state = {
        activeStep: 0,
        spacing: 16,
    };

    constructor(props) {

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        let that = this;

        //@todo: hard coded values
        let name = 'eric is great';
        let userType = 'On a student visa';
        let visaType = 'H-1B';
        let speakEnglish = true;
        let skills = ['Farmer', 'Accountant'];
        let seekingPermanentResidency = true;


        // console.log(this.props);

        User.populateUser(
            this.props.authUser.uid,
            {
                name: name,
                type: userType,
                visaType: visaType,
                speakEnglish: speakEnglish,
                skills: skills,
                seekingPermanentResidency: seekingPermanentResidency,

                userPopulated: true // fixed value
            }
        ).then(result => {
            that.setState({formSubmitted: true});
        });

        event.preventDefault();
    }

    handleChange = key => (event, value) => {
        this.setState({
            [key]: value,
        });
    };

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
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
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;
        const { spacing } = this.state;

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
                                        <Typography>{getStepContent(index)}</Typography>
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
                                                    onClick={this.handleNext}
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

export default withStyles(styles)(Registration);
