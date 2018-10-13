import React, {Component} from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import RadioGroup from '@material-ui/core/RadioGroup';
import {withStyles} from "@material-ui/core/styles/index";

const styles = theme => ({
    root: {},
});

class SpeakEnglish extends Component {
    state = {
        value:''
    };

    handleChange = event => {
        this.setState({value: event.target.value });
    };

    options = ['Yes','No'];

    render() {
        const {classes} = this.props;

        return (
            <FormControl component="fieldset" className={classes.formControl}>
                <RadioGroup
                    aria-label="Do you speak english?"
                    name="speak-english"
                    className={classes.group}
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    {this.options.map((option) =>
                        <FormControlLabel control={
                            <Radio
                                checked={this.state.value === option}
                                onChange={this.handleChange}
                                aria-label={option}
                                value={option}
                            />
                        } label = {option}/>
                    )}
                </RadioGroup>
            </FormControl>
        );
    }
}

export default withStyles(styles)(SpeakEnglish);