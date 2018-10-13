import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        width:'90%',
        margin:'5%',
        marginTop:'30%'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class ImigrantType extends React.Component {
    state = {
        value:''
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <form  autoComplete="off" className="i-am-form">

                <FormControl className = {classes.root} >
                    <Select
                        value={this.state.value}
                        onChange={this.handleChange}
                        name="value"
                        displayEmpty
                    >
                        <MenuItem value="" disabled>
                            &lt; Select One &gt;
                        </MenuItem>
                        <MenuItem value={10}>On a student visa</MenuItem>
                        <MenuItem value={20}>On a work visa</MenuItem>
                        <MenuItem value={30}>Sponsored by a family member</MenuItem>
                        <MenuItem value={30}>I don't have a visa</MenuItem>
                    </Select>
                </FormControl>
            </form>
        );
    }
}


export default withStyles(styles)(ImigrantType);