import React, {Component} from 'react';
import * as showdown from "showdown";
import {getResource, getTasks} from "../../../redux/actions/knowledgebase";
import {Link} from "react-router-dom";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography/Typography";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Paper from "@material-ui/core/Paper/Paper";
import {ArrowForward} from "@material-ui/icons";

const converter = new showdown.Converter();
const defaultState = {resource: {}, tasks: {}};

const styles = {
    heroImage: {
        width: '100%',
        height: '150px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%'
    },
    objectMargin: {
        marginLeft: '19px',
        marginRight: '19px'
    },
    title: {
        marginTop: '27px',
        marginBottom: '12px',
        color: '#212121',
        fontWeight: '600'
    },
    content: {
        color: '#7B7B7B'
    },
    tasksHeader: {
        marginBottom: '16px'
    },
    taskList: {
        paddingTop: '0',
        paddingBottom: '0'
    },
    taskItem: {
        paddingTop: '6px',
        paddingBottom: '6px',
        paddingLeft: '0',
        paddingRight: '0'
    },
    taskItemText: {
        fontSize: '14px',
        color: '#212121'
    },
    taskCheckbox: {
        paddingLeft: '15px',
        paddingRight: '0'
    },
    arrowIcon: {
        color: '#7B7B7B',
        marginRight: '15px'
    },
    taskLink: {
        width: '100%',
        display: 'flex',
        position: 'relative',
        boxSizing: 'border-box',
        textAlign: 'left',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textDecoration: 'none',
    }
};

class Details extends Component {
    state = defaultState;

    loadResource(resourceId) {
        return Promise.all([getResource(resourceId), getTasks(resourceId)]).then(([resourceDoc, taskDocs]) => {
            const tasks = {};

            taskDocs.forEach(taskDoc => {
                tasks[taskDoc.id] = taskDoc.data();
            });

            this.setState({resource: resourceDoc.data(), tasks});
        });
    }

    componentDidMount() {
        this.loadResource(this.props.match.params.id);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            this.setState(() => defaultState);

            this.loadResource(nextProps.match.params.id);
        }

        return true;
    }

    render() {
        const {title, description} = (this.state.resource.i18n || {})['en_US'] || {};
        const {classes} = this.props;
        const taskIds = Object.keys(this.state.tasks);

        return (
            <div className="resource-details">
                <div className={classes.heroImage} style={{backgroundImage: `url(${this.state.resource.image})`}}/>
                <Typography className={[classes.title, classes.objectMargin].join(' ')}
                            variant={"h5"}>{title}</Typography>
                <div className={[classes.content, classes.objectMargin].join(' ')}
                     dangerouslySetInnerHTML={{__html: converter.makeHtml(description)}}/>
                {
                    taskIds.length > 0
                        ? (
                            <React.Fragment>
                                <Typography className={[classes.objectMargin, classes.tasksHeader].join(' ')}
                                            variant={"h6"}>Things to do</Typography>
                                <Paper className={classes.objectMargin}>
                                    <List className={classes.taskList}>
                                        {Object.keys(this.state.tasks).map(taskId => (
                                            <ListItem
                                                divider
                                                key={taskId}
                                                role={undefined}
                                                dense
                                                button
                                                onClick={() => {
                                                }}
                                                className={classes.taskItem}
                                            >
                                                <Link className={classes.taskLink} to={`/knowledgebase/view/${taskId}`}>
                                                    <Checkbox
                                                        checked={false}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        className={classes.taskCheckbox}
                                                    />
                                                    <ListItemText className={classes.taskItemText}
                                                                  primary={this.state.tasks[taskId].i18n.en_US.title}/>
                                                    <ArrowForward className={classes.arrowIcon}/>
                                                </Link>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Paper>
                            </React.Fragment>
                        )
                        : <React.Fragment/>
                }
            </div>
        );
    }
}

export default withStyles(styles)(Details);
