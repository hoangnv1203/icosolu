import React from 'react';
import { connect } from 'react-redux';

import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';

class AccountSettingsContainer extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="col-md-4 col-md-offset-1">
                <div className="form form-settings">
                    <span className="form__titleCaps">Account Settings</span>
                    <ChangeEmail />
                    <ChangePassword />
                </div>
            </div>
        );
    }
}

export default connect()(AccountSettingsContainer);