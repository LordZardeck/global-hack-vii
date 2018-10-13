import React, {Component} from 'react';
import {connect} from 'react-redux';

class IAmType extends Component {
    render() {
        return (
            <div>
                Hello
            </div>
        );
    }
}

export default connect()(IAmType);
