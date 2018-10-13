import React, {Component} from 'react';
import './App.css';
import Immigrant from './Containers/Registration/Immigrant'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Immigrant/>
            </div>
        );
    }
}

export default App;
