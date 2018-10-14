import React, {Component} from 'react';
import './SOS.css';

class SOS extends Component
{
    handleSosToggle(e) {
        e.preventDefault();

        e.target.parentElement.classList.toggle('hidden');
    }

    sanitizePhoneNumber(phoneNumber) {
        return phoneNumber.replace(/[^0-9]/g, '');
    }

    render() {
        return <div className="SOS hidden">
            <a href="#" className="trigger" onClick={this.handleSosToggle}>
                SOS
            </a>

            <div className="contact-form">
                <div className="sponsor-info">
                    <img className="thumbnail" alt="Sponsor Thumbnail" src="images/Ruben.png" />

                    <span>Hello! I'm {this.props.user.sponsor.name}. I'm here to help.</span>
                </div>
                <div className="sponsor-contact">
                    <a href={`https://wa.me/${this.sanitizePhoneNumber(this.props.user.sponsor.telephone)}`} className="contact whatsapp">
                        <span>Chat on Whatsapp</span>
                    </a>
                    <a href={`tel:${this.sanitizePhoneNumber(this.props.user.sponsor.telephone)}`} className="contact telephone">
                        <span>{this.props.user.sponsor.telephone}</span>
                    </a>
                </div>
            </div>
        </div>
    }
}

export default SOS;
