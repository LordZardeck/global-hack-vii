import React, {Component} from 'react';
import showdown from 'showdown';
import './Article.css';

const converter = new showdown.Converter();

export default class Article extends Component {
    getLocalizedArticle() {
        return this.props.article.i18n['es_ES'];
    }

    render() {
        return (
            <div className="article">
                {this.props.article.image && (
                    <div className="thumbnail" style={{backgroundImage: `url(${this.props.article.image})`}}/>
                )}
                <h2>{this.getLocalizedArticle().title}</h2>
                <div className="content" dangerouslySetInnerHTML={{__html: converter.makeHtml(this.getLocalizedArticle().description)}}/>
            </div>
        );
    }
}
