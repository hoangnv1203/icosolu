import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import AccountActions from './../../../actions/AccountActions';
import ModalActions from './../../../actions/ModalActions';

import Constants from './../../../constants/Constants';

class ConfirmChangeEmail extends React.Component {
    constructor(props) {
        super(props);

        const GETparams = new URLSearchParams(window.location.search);

        let hash = GETparams.get('token');
        if(!hash)
            browserHistory.push('/');

        props.confirmNewEmail({
            confirm_hash: hash
        }).then(() => {
            props.modalShowInfo({
                title: 'Confirm new email success'
            });

            props.initialize();

            if(props.isGuest) {
                browserHistory.push('/login');
            } else {
                browserHistory.push('/settings');
            }
        }).catch(errors => {
            errors = errors.errors;
            props.modalShowInfo({
                description: errors[0] ? errors[0].msg : '',
                icon: Constants.ICON.error
            });
            browserHistory.push('/');
        });

    }

    render() {
        return (
            <div></div>
        );
    }
}

export default connect(
    (state) => {
        return {
            isGuest: state.account.get('isGuest')
        }
    },
    (dispatch) => {
        return {
            initialize: () => dispatch(AccountActions.initialize()),
            modalShowInfo: (params) => dispatch(ModalActions.showInfo(params)),
            confirmNewEmail: (params) => dispatch(AccountActions.confirmNewEmail(params))
        }
    }
)(ConfirmChangeEmail);