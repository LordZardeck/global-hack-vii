import React, {Component} from 'react';
import './UserInfo.css';
import {populateUser} from '../../redux/actions/user';

export default class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authUser: this.props.authUser,
            formSubmitted: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        let that = this;

        // TODO: Remove hard coded values
        let name = 'eric is great';
        let userType = 'On a student visa';
        let visaType = 'H-1B';
        let speakEnglish = true;
        let skills = ['Farmer', 'Accountant'];
        let seekingPermanentResidency = true;

        populateUser(
            this.props.authUser.uid,
            {
                name: name,
                type: userType,
                visaType: visaType,
                speakEnglish: speakEnglish,
                skills: skills,
                seekingPermanentResidency: seekingPermanentResidency,
                userPopulated: true // fixed value
            }
        ).then(() => that.setState({formSubmitted: true}));

        event.preventDefault();
    }

    render() {
        return (
            <div className="user-info">
                {!this.state.formSubmitted ? (
                    <form onSubmit={this.handleSubmit}>
                        <h1>@TODO: form goes here</h1>
                        <input type="submit" value="Submit" />
                    </form>
                ) : (
                    <p>you're the best.</p>
                )}
            </div>
        );
    }
}
