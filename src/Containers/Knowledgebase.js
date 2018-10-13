import React, {Component} from 'react';
import {connect} from 'react-redux';
import Card from "../Components/Knowledgebase/Resource/Card";

class Knowledgebase extends Component {
    render() {
        return (
            <div className="knowledgebase">
                {Object.keys(this.props.resources).map(resourceId => <Card key={resourceId} resource={this.props.resources[resourceId]}/>)}
            </div>
        );
    }
}

export default connect(state => ({...state.knowledgebase}))(Knowledgebase);
