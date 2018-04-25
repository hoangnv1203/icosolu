import React from 'react';
import { connect } from 'react-redux';

import ModalActions from './../../../../actions/ModalActions';
import AccountActions from './../../../../actions/AccountActions';

class ChangeEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resending: false
        };
    }

    onClick(e) {
        e.preventDefault();

        this.props.modalShowChangeEmail({
            callback: () => {
                this.props.modalShowInfo({
                    title: 'Change email',
                    description: 'A confirmation email has been sent to your email'
                })
            }
        })
    }

    resendEmail(e) {

        if (this.state.resending) {
            return false;
        }

        e.preventDefault();

        return this.setState({
            resending: true
        }, () => {

            return this.props.resendEmail().then(() => {
                    return this.props.modalShowInfo({
                        title: 'Resend email',
                        description: 'A confirmation email has been sent to your email'
                    });
                }).catch((resp) => {
                    return this.props.modalShowInfo({
                        title: 'Resend email',
                        description: resp && resp.errors && resp.errors.length ? resp.errors[0]['msg'] : 'Error',
                        icon: 'icon-modal-error'
                    });
                }).then(() => {
                    return this.setState({
                        resending: false
                    });
                });

        });

    }
    
    render() {

        let { user } = this.props;

        return (
            <div>
                <div className="form__row">
                    <input
                        type="text"
                        className="input-def"
                        readOnly="readOnly"
                        value={user.email}
                    />

                    <a href="" onClick={e => this.onClick(e)} className="form__btnEdit"><i className="icon-edit" /></a>

                </div>

                {!user.is_confirmed ?
                    <div className="form__note">
                        You did not confirm your email address. {this.state.resending ? <a href="#resend-email" className="link">Resending...</a> : <a href="#resend-email" onClick={this.resendEmail.bind(this)} className="link">Resend email</a>}
                    </div>
                :
                    null
                }
            </div>

        );
    }
}

export default connect(
    (state) => {
        return {
            user: state.account.get('user')
        }
    },
    (dispatch) => {
        return {
            modalShowChangeEmail: (params) => dispatch(ModalActions.showChangeEmail(params)),
            modalShowInfo: (params) => dispatch(ModalActions.showInfo(params)),
            resendEmail: (params) => dispatch(AccountActions.resendEmail(params))
        }
    }
)(ChangeEmail);