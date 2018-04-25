import React from 'react';
import { connect } from 'react-redux';

import TFADisabled from './TFADisabled';
import TFAEnabled from './TFAEnabled';

class TFAContainer extends React.Component {
    constructor() {
        super();
    }

    render() {

        let { user } = this.props;

        return (
            <div className="col-md-5 col-md-offset-1">
                {user.tfa ? <TFAEnabled /> : <TFADisabled />}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            user: state.account.get('user')
        }
    }
)(TFAContainer);