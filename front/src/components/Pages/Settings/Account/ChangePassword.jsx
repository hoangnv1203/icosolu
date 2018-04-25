import React from 'react';
import { connect } from 'react-redux';

import ModalActions from './../../../../actions/ModalActions';

class ChangePassword extends React.Component {
    constructor() {
        super();
    }

    onClick(e) {
        e.preventDefault();

        this.props.modalShowChangePassword({
            callback: () => {
                this.props.modalShowInfo({
                    title: 'Change password',
                    description: 'Your password has been changed successfully!'
                })
            }
        })
    }

    render() {
        return (
            <div className="form__row">
                <input type="text" className="input-def input-dynamic" placeholder="Code"/>
                <button className="btn btn-primary fluid form__btnAdd" onClick={e => this.onClick(e)}>
                    <span className="btn__txt">Change Password</span>
                </button>
            </div>
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
            modalShowChangePassword: (params) => dispatch(ModalActions.showChangePassword(params)),
            modalShowInfo: (params) => dispatch(ModalActions.showInfo(params))
        }
    }
)(ChangePassword);