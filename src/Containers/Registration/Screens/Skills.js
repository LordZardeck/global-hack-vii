import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
        width: '250px',
        display: 'flex',
        flexWrap: 'wrap',
    },
    select: {
        width: '100%'
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

class Skills extends React.Component {
    state = {
        value: [],
        spacing: 16,
        open: false,
    };

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
        'I\'m awesome',
        'I did a thing once',
        'I can ride my bike with no handle bars',
    ];

    render() {
        const {classes, theme} = this.props;
        const {spacing} = this.state;

        return (
            <FormControl component="fieldset" className={classes.root}>
                <InputLabel htmlFor="skills">Skills</InputLabel>
                <Select
                    value={this.state.value}
                    onChange={this.handleChange}
                    open={this.state.open}
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={selected => (
                        <div className={classes.chips}>
                            {selected.map(value => (
                                <Chip key={value} label={value} className={classes.chip} />
                            ))}
                        </div>
                    )}
                    multiple
                    MenuProps={MenuProps}
                    inputProps={{
                        name: 'skills',
                        id: 'skills',
                    }}
                >
                    {
                        this.options.map(
                            (option) =>
                                <MenuItem
                                    key={option}
                                    style={{
                                        fontWeight:
                                            this.state.value.indexOf(option) === -1
                                                ? theme.typography.fontWeightRegular
                                                : theme.typography.fontWeightMedium,
                                    }}
                                    value={option}>{option}</MenuItem>
                        )
                    }
                </Select>
            </FormControl>
        );
    }
}

Skills.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Skills);