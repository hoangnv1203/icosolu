import React from 'react';
import {connect} from 'react-redux';
import { replace } from 'react-router-redux';

export function requireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {

        componentWillMount() {
            this.checkAuth(this.props.isGuest);
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps.isGuest);
        }

        checkAuth(isGuest) {
            if (isGuest) {
                let redirectAfterLogin = this.props.location.pathname;
                let url = redirectAfterLogin ? `/login?next=${redirectAfterLogin}` : '/login';
                this.props.dispatch(replace(url));
            }
        }

        render() {
            return this.props.isGuest === false ? <Component {...this.props} /> : null;
        }
    }

    const mapStateToProps = (state) => ({
        isGuest: state.account.get('isGuest')
    });

    return connect(mapStateToProps)(AuthenticatedComponent);

}