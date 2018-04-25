import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import AccountActions from './../../../actions/AccountActions';

class PanelUser extends React.Component {

    constructor() {
        super();
    }

    onLogout(e) {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        let { user } = this.props;

        return (
            <div className="header__profile">
                <div className="profile__user">
                    <div className="profile__info">
                        <Link to="/settings" className="profile__email">{user.email}</Link>
                        <a href="" onClick={e => this.onLogout(e)} className="link-primary">Logout</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            user        : state.account.get('user')
        }
    },
    (dispatch) => ({
        logout: () => dispatch(AccountActions.logout())
    })
)(PanelUser);