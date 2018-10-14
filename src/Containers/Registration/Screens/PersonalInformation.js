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
        firstName:'',
        lastName: '',
        email:'',
        phone:''
    };

    getStepState() {
        return {...this.state};
    }

    handleChange(name) {
        return event => {
            this.setState({
                [name]: event.target.value,
            });
        };
    }

    options = [
        {
            label: 'First Name',
            name: 'firstName'
        },
        {
            label: 'Last Name',
            name: 'lastName'
        },
        {
            label: 'Email',
            name: 'email'
        },
        {
            label: 'Phone',
            name: 'phone'
        }
    ];

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                {this.options.map((option, index) =>
                    <TextField
                        key={index}
                        name={option.name}
                        label={option.label}
                        onChange={this.handleChange(option.name)}
                    />
                )}
            </div>
        );
    }
}

export default withStyles(styles)(PersonalInformation);
