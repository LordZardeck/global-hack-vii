import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import {Link} from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {ArrowForward} from "@material-ui/icons";
import {connect} from "react-redux";
import {styles} from '../Components/Knowledgebase/Resource/Details';
import {withStyles} from "@material-ui/core";

const dashboardStyles = {
    ...styles,
    tasksHeader: {
        ...styles.tasksHeader,
        marginTop: '30px'
    },
    showCompletedLink: {
        fontSize: '14px',
        color: '#0277BD',
        textDecoration: 'none',
        '&:active': {
            color: '#0277BD'
        },
        '&:hover': {
            color: '#0da5fd'
        },
        '&:focus': {
            color: '#015788'
        }
    }
};

class Dashboard extends Component {
    render() {
        const {resources, classes} = this.props;

        return (
            <React.Fragment>
                <Typography className={[classes.objectMargin, classes.tasksHeader].join(' ')}
                            variant={"h6"}>My Pathway</Typography>
                {
                    Object.keys(resources).length > 0
                        ? (
                            <Paper className={[classes.objectMargin, classes.section].join(' ')}>
                                <List className={classes.taskList}>
                                    {Object.keys(resources).map(resourceId => (
                                        <ListItem
                                            divider
                                            key={resourceId}
                                            role={undefined}
                                            dense
                                            button
                                            onClick={() => {
                                            }}
                                            className={classes.taskItem}
                                        >
                                            <Link className={classes.taskLink} to={`/knowledgebase/view/${resourceId}`}>
                                                <Checkbox
                                                    checked={false}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    className={classes.taskCheckbox}
                                                />
                                                <ListItemText className={classes.taskItemText}
                                                              primary={resources[resourceId].i18n.en_US.title}/>
                                                <ArrowForward className={classes.arrowIcon}/>
                                            </Link>
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        )
                        : <React.Fragment/>
                }
                <Link className={[classes.objectMargin, classes.showCompletedLink].join(' ')} to="/">Show completed tasks...</Link>
            </React.Fragment>
        );
    }
}

export default withStyles(dashboardStyles)(connect(state => ({...state.knowledgebase}))(Dashboard));
