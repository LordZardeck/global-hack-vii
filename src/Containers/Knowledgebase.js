import React, {Component} from 'react';
import {connect} from 'react-redux';
import Article from "../Components/Knowledgebase/Article";

class Knowledgebase extends Component {
    render() {
        return (
            <div className="knowledgebase">
                {Object.keys(this.props.articles).map(articleId => <Article key={articleId} article={this.props.articles[articleId]}/>)}
            </div>
        );
    }
}

export default connect(state => ({articles: state.goals.goals}))(Knowledgebase);
