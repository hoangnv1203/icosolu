import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class GetResponse extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(function(){jQuery('#getresponse-form').submit()}, 1000);
    }

    render() {
        let email = this.props.location.query.email;

        return (
            <div>
                <form id="getresponse-form" action="https://app.getresponse.com/add_contact_webform_v2.html?u=Yf3&amp;webforms_id=17915402" method="post">
                    <div className="field">
                        <input id="getresponse-email" type="text" className="textbox" placeholder="Enter Your Email Address" value={email} name="webform[email]" />
                    </div>
                    <div className="field">
                        <button type="submit" className="button border">
                            <span>GET ACCESS FREE</span>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect()(GetResponse);