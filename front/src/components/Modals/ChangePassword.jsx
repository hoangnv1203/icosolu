import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap4-modal';

import AccountActions from './../../actions/AccountActions';
import ModalActions from './../../actions/ModalActions';

class ModalChangePassword extends React.Component {

    static propTypes = {
        show: PropTypes.bool,
    }

    static defaultProps = {
        show: false,
    }

    constructor(props) {
        super(props);

        this.state = this.getInitializeState();
    }

    getInitializeState() {
        return {
            password: {
                value: '',
                error: null
            },
            newPassword: {
                value: '',
                error: null
            },
            confirmPassword: {
                value: '',
                error: null
            },
            loading: false
        }

    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if(this.props.show) {
            document.body.classList.toggle('modal-open');
        } else {

            document.body.classList.remove('modal-open');
        }
    }

    validate(state) {
        if(!state.password.value) {
            state.password.error = 'Password is required';
        }

        if(!state.newPassword.value) {
            state.newPassword.error = 'New Password is required';
        }

        if(!state.confirmPassword.value) {
            state.confirmPassword.error = 'Repeat Password is required';
        }

        if(state.confirmPassword.value != state.newPassword.value) {
            state.confirmPassword.error = 'Passwords must match';
        }

        return state;
    }

    onClose(e) {
        e.preventDefault();

        this.props.close();
        this.setState(this.getInitializeState());
    }

    onSend(e) {
        e.preventDefault();

        this.setState({loading: true});

        let { password, newPassword, confirmPassword } = this.validate(this.state);

        if(password.error || newPassword.error || confirmPassword.error) {
            this.setState({
                password,
                newPassword,
                confirmPassword,
                loading: false
            });
            return;
        }

        this.props.changePassword({
            password: password.value,
            new_password: newPassword.value
        }).then(data => {
            this.setState({loading: false});

            if(this.props.callback && typeof this.props.callback == 'function') {
                this.props.callback();
            }

            this.props.close();
            this.setState(this.getInitializeState());
        }).catch(errors => {
            this.setState({loading: false});

            errors = errors.errors;
            for(let i in errors) {
                switch (errors[i].param) {
                    case 'password':
                        password.error = errors[i].msg;
                        this.setState(password);
                        break;
                    case 'new_password':
                        newPassword.error = errors[i].msg;
                        this.setState(newPassword);
                        break;
                }
            }
        });

    }

    render() {
        let { show } = this.props;
        let { password, newPassword, confirmPassword, loading } = this.state;
        
        return (
            <div className="modal_xs">
                <Modal visible={show} onClickBackdrop={e => this.onClose(e)}>
                    <div className="modal-header">
                        <span className="modal__title">Change Password</span>
                        <a href="" onClick={e => this.onClose(e)} type="button" className="modal-close">
                            <i className="icon-close" />
                        </a>
                    </div>
                    <div className="modal-body">
                        <form className="form" onSubmit={e => this.onSend(e)}>
                            <div className={`form__row ${password.error ? 'error' : ''}`}>
                                <input
                                    type="password"
                                    className="input-def"
                                    onChange={e => this.setState({password: {value: e.target.value}})}
                                    value={password.value}
                                    placeholder="Current Password"
                                />
                                <div className="form__errorBox">
                                    <i className="icon-error" />
                                    <span> {password.error}</span>
                                </div>
                            </div>
                            <div className={`form__row ${newPassword.error ? 'error' : ''}`}>
                                <input
                                    type="password"
                                    className="input-def"
                                    onChange={e => this.setState({newPassword: {value: e.target.value}})}
                                    value={newPassword.value}
                                    placeholder="New Password"
                                />
                                <div className="form__errorBox">
                                    <i className="icon-error" />
                                    <span> {newPassword.error}</span>
                                </div>
                            </div>
                            <div className={`form__row ${confirmPassword.error ? 'error' : ''}`}>
                                <input
                                    type="password"
                                    className="input-def"
                                    onChange={e => this.setState({confirmPassword: {value: e.target.value}})}
                                    value={confirmPassword.value}
                                    placeholder="Repeat New Password"
                                />
                                <div className="form__errorBox">
                                    <i className="icon-error" />
                                    <span> {confirmPassword.error}</span>
                                </div>
                            </div>
                            <div className="form__row">
                                <button className={`btn btn-primary fluid ${loading ? 'inProgress' : ''}`} disabled={loading ? true : ''}>
                                    <span className="btn__txt">Confirm</span>
                                    <span className="btn__dynamicBox">
                                        <span>Confirm...</span>
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            show        :state.modal.getIn(['changePassword','show']),
            callback    :state.modal.getIn(['changePassword','callback']),
        }
    },
    (dispatch) => {
        return {
            changePassword: (params) => dispatch(AccountActions.changePassword(params)),
            close: () => dispatch(ModalActions.closeChangePassword())
        }
    }
)(ModalChangePassword);