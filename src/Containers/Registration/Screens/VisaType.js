import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {},
    checked: {},
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
    hidden: {
        display: 'none',
    },
    selected: {
        outline: '1px solid #ccc'
    },
    label: {
        display: 'block',
        textAlign: 'center',
        padding: '7px',
        fontSize: '20px',
    }
});

class VisaType extends Component {
    state = {
        value:'H-1B',
        spacing: 16,
    };

    getStepState() {
        return {visaType: this.state.value};
    }

    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    options = ['H-1B', 'H-1B1', 'H-2A', 'H-2B', 'H-3', 'L', 'O', 'P-1', 'P-2', 'P-3', 'Q-1'];

    render() {
        const {classes} = this.props;
        const {spacing} = this.state;

        return (
            <FormControl component="fieldset" className={classes.formControl}>
                <RadioGroup
                    aria-label="Visa Type"
                    className={classes.group}
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    <Grid container justify="flex-start" className={classes.root} spacing={spacing}>
                        {this.options.map((option, index) =>
                            <Grid key={index} item xs={4}>
                                <FormControlLabel
                                    className={`${this.state.value === option ? classes.selected : ''} ${classes.label}`}
                                    value={option}
                                    control={
                                        <Radio
                                            checked={this.state.value === option}
                                            onChange={this.handleChange}
                                            value={option}
                                            name="visa_type"
                                            aria-label={option}
                                            className={classes.hidden}
                                        />
                                    }
                                    label={option} />
                            </Grid>
                        )}
                    </Grid>
                </RadioGroup>
            </FormControl>
        );
    }
}

VisaType.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VisaType);
