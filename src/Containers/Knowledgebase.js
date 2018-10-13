import React, {Component} from 'react';
import Article from "../Components/Knowledgebase/Article";

class Knowledgebase extends Component {
    getArticles() {
        return [
            {
                id: 1,
                title: 'My Article One',
                description: 'Replace with lorem',
                image: '/images/luca-micheli-422053-unsplash.jpg'
            },
            {
                id: 2,
                title: 'My Article One',
                description: 'Replace with lorem',
                image: '/images/luca-micheli-422053-unsplash.jpg'
            },
            {
                id: 3,
                title: 'My Article One',
                description: 'Replace with lorem',
                image: '/images/luca-micheli-422053-unsplash.jpg'
            },
            {
                id: 4,
                title: 'My Article One',
                description: 'Replace with lorem',
                image: '/images/luca-micheli-422053-unsplash.jpg'
            }
        ];
    }

    render() {
        return (
            <div className="knowledgebase">
                {this.getArticles().map(article => <Article key={article.id} article={article}/>)}
            </div>
        );
    }
}

export default Knowledgebase;
