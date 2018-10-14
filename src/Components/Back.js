import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import './Back.css'




const Back = ({ history }) => (
    <button onClick={history.goBack}><FontAwesomeIcon className = "backButton" icon={faArrowLeft} /></button>
);

export default withRouter(Back);
