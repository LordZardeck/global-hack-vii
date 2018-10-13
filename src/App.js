import React, {Component} from 'react';
import './App.css';
import Registration from './Containers/Registration/Registration'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: blue,
    },
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App">
                    <Registration/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
