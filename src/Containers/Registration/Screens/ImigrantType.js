import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '90%',
        margin: '5%',
        marginTop: '30%'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class ImmigrantType extends React.Component {
    state = {
        value: '',
        spacing: 16,
    };

    handleChange = event => {
        this.setState({value: event.target.value});
    };

    options = [
        '',
        'On a student visa',
        'On a work visa',
        'Sponsored by a family member',
        'I don\'t have a visa'
    ];

    render() {
        const {classes} = this.props;
        const {spacing} = this.state;

        return (
            <Grid container justify="left" className={classes.root} spacing={spacing}>
                <Grid item xs={12}>
                    <Select
                        value={this.state.value}
                        onChange={this.handleChange}
                        name="value"
                        displayEmpty
                    >
                        {
                            this.options.map(
                                (option) =>
                                    <MenuItem value={option}>{option}</MenuItem>
                            )
                        }
                    </Select>
                </Grid>
            </Grid>
        );
    }
}


export default withStyles(styles)(ImmigrantType);