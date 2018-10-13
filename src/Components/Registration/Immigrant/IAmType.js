import React, {Component} from 'react';
import {connect} from 'react-redux';

class IAmType extends Component {
    render() {
        return (
            <div></div>
        );
    }
}

export default connect()(IAmType);
