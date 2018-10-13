import React, {Component} from 'react';
import './App.css';
import Knowledgebase from "./Containers/Knowledgebase";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Knowledgebase/>
            </div>
        );
    }
}

export default App;
