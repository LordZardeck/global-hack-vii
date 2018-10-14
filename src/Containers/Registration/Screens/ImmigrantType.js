import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
    root: {
        width: '250px'
    },
    select: {
        width: '100%'
    },
});

class ImmigrantType extends Component {
    state = {
        value: '',
        spacing: 16,
        open: false,
    };

    getStepState() {
        return {immigrantType: this.state.value};
    }

    handleChange = event => {
        this.setState({value: event.target.value });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    options = [
        'On a student visa',
        'On a work visa',
        'Sponsored by a family member',
        'I don\'t have a visa'
    ];

    render() {
        const {classes} = this.props;

        return (
            <FormControl component="fieldset" className={classes.root}>
                <InputLabel htmlFor="immigrant-type-select">Immigrant Type</InputLabel>
                    <Select
                        value={this.state.value}
                        onChange={this.handleChange}
                        open={this.state.open}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        inputProps={{
                            name: 'immigrant_type',
                            id: 'immigrant-type-select',
                        }}
                    >
                        {
                            this.options.map(
                                (option, index) =>
                                    <MenuItem key={index} value={option}>{option}</MenuItem>
                            )
                        }
                    </Select>
            </FormControl>
        );
    }
}

export default withStyles(styles)(ImmigrantType);
