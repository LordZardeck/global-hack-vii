import React, {Component} from 'react';
import * as showdown from "showdown";
import {getResource, getTasks} from "../../../redux/actions/knowledgebase";
import {Link} from "react-router-dom";
import './Details.css';

const converter = new showdown.Converter();
const defaultState = {resource: {}, tasks: {}};

export default class Details extends Component {
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
        if(this.props.match.params.id !== nextProps.match.params.id) {
            this.setState(() => defaultState);

            this.loadResource(nextProps.match.params.id);
        }

        return true;
    }

    static getLocalizedTask(task) {
        return task.i18n['en_US'];
    }

    render() {
        const {title, description} = (this.state.resource.i18n || {})['en_US'] || {};

        return (
            <div className="resource-details">
                <img src={this.state.resource.image} alt="resource thumbnail"/>
                <h1>{title}</h1>
                <div className="content" dangerouslySetInnerHTML={{__html: converter.makeHtml(description)}}/>
                <ol>
                    {Object.keys(this.state.tasks).map(taskId => (
                        <li key={taskId}><Link to={`/knowledgebase/view/${taskId}`}>{this.state.tasks[taskId].i18n.en_US.title}</Link></li>
                    ))}
                </ol>
            </div>
        );
    }
}
