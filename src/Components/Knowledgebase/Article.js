import React, {Component} from 'react';
import showdown from 'showdown';
import './Article.css';

const converter = new showdown.Converter();

export default class Article extends Component {
    render() {
        return (
            <div className="article">
                {this.props.article.image && (
                    <div className="thumbnail" style={{backgroundImage: `url(${this.props.article.image})`}}/>
                )}
                <h2>{this.props.article.title}</h2>
                <div className="content" dangerouslySetInnerHTML={{__html: converter.makeHtml(this.props.article.description)}}/>
            </div>
        );
    }
}
