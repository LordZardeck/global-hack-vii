import React, {Component} from 'react';
import './Card.css';
import {Link} from "react-router-dom";

export default class Card extends Component {
    getLocalizedArticle() {
        return this.props.resource.i18n['en_US'];
    }

    render() {
        return (
            <div className="resource-card">
                <Link to={`/knowledgebase/view/${this.props.resource.id}`}>
                    {this.props.resource.image && (
                        <div className="thumbnail" style={{backgroundImage: `url(${this.props.resource.image})`}}/>
                    )}
                    <h2>{this.getLocalizedArticle().title}</h2>
                </Link>
            </div>
        );
    }
}
