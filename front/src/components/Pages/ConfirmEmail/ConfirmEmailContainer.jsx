import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import GlobalActions from './../../../actions/GlobalActions';
import AccountAction from './../../../actions/AccountActions';
import ModalAction from './../../../actions/ModalActions';

import Constants from './../../../constants/Constants';

class ConfirmEmailContainer extends React.Component {
    constructor(props) {
        super(props);

        const GETparams = new URLSearchParams(window.location.search);
        props.confirmEmail(GETparams.get('token')).then(data => {
            props.modalShowInfo({
                title: 'Thanks! You email was successfully verified'
            });
            this.props.updateUser();
        }).catch(errors => {
            errors = errors.errors;
            props.modalShowInfo({
                title: 'Confirm email error',
                description: errors[0].msg,
                icon: Constants.ICON.error
            })
        });
        browserHistory.push('/');
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

        }
    },
    (dispatch) => {
        return {
            setVisibleFooter: (visible) => dispatch(GlobalActions.setVisibleFooter(visible)),
            confirmEmail: (hash) => dispatch(AccountAction.confirmEmail(hash)),
            modalShowInfo: (params) => dispatch(ModalAction.showInfo(params)),
            updateUser: (params) => dispatch(AccountAction.initialize(params))
        }
    }
)(ConfirmEmailContainer);