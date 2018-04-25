import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class PanelGuest extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="header__profile">
                <div className="profile__visitor">
                    <Link to="/sign-up" className="btn btn-curved">
                        <span className="curvedBtm" />
                        <span className="btn__txt">Sign Up</span>
                    </Link>
                    <Link to="/login" className="link-def">Login</Link>
                </div>
            </div>
        );
    }
}

export default connect()(PanelGuest);