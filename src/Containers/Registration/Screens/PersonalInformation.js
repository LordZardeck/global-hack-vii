import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import {withStyles} from "@material-ui/core/styles/index";

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
});

class PersonalInformation extends Component {
    state = {
        FirstName:'',
        LastName: '',
        Email:'',
        Phone:''
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    options = [
        'FirstName', 'LastName', 'Email', 'Phone'
    ];

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                {this.options.map((option) =>
                    <TextField
                        id={option}
                        label={option}
                        value={this.state.name}
                        onChange={this.handleChange({option})}
                    />
                )}
            </div>
        );
    }
}

export default withStyles()(PersonalInformation);