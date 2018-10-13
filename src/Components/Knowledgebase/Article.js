import React, {Component} from 'react';
import './Article.css';

export default class Article extends Component {
    getLocalizedArticle() {
        return this.props.article.i18n['en_US'];
    }

    render() {
        return (
            <div className="article">
                {this.props.article.image && (
                    <div className="thumbnail" style={{backgroundImage: `url(${this.props.article.image})`}}/>
                )}
                <h2>{this.getLocalizedArticle().title}</h2>
            </div>
        );
    }
}
