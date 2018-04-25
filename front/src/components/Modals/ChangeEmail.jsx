import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap4-modal';

import Helper from './../../services/Helper';

import AccountActions from './../../actions/AccountActions';
import ModalActions from './../../actions/ModalActions';

class ModalChangeEmail extends React.Component {

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
            email: {
                value: '',
                error: null
            },
            password: {
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
        if(!state.email.value || !Helper.validateEmail(state.email.value)) {
            state.email.error = 'Invalid email';
        }

        if(!state.password.value) {
            state.password.error = 'Password is required';
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

        if (this.state.loading) {
            return;
        }


        this.setState({loading: true, email: {
            value: this.state.email.value,
            error: null
        }}, () => {
            let { email, password } = this.validate(this.state);

            if(email.error || password.error) {
                this.setState({
                    email,
                    password,
                    loading: false
                });
                return;
            }

            this.props.changeEmail({
                new_email: email.value,
                password: password.value
            }).then(() => {
                this.setState({loading: false});
                if(this.props.callback && typeof this.props.callback == 'function') {
                    this.props.callback();
                }
                this.props.close();
                this.props.initialize();
                this.setState(this.getInitializeState());
            }).catch(errors => {
                this.setState({loading: false});
                errors = errors.errors;

                for(let i in errors) {
                    switch (errors[i].param) {
                        case 'new_email':
                            email.error = errors[i].msg;
                            this.setState(email);
                            break;
                        case 'password':
                            password.error = errors[i].msg;
                            this.setState(password);
                            break;
                    }
                }
            })
        });



    }

    render() {

        let { show } = this.props;
        let { email, password, loading } = this.state;

        return (
            <div className="modal_xs">
                <Modal visible={show} onClickBackdrop={e => this.onClose(e)}>
                    <div className="modal-header">
                        <span className="modal__title">Change Email</span>
                        <a href="" onClick={e => this.onClose(e)} type="button" className="modal-close">
                            <i className="icon-close" />
                        </a>
                    </div>
                    <div className="modal-body">
                        <form className="form" onSubmit={e => this.onSend(e)}>
                            <div className={`form__row ${email.error ? 'error' : ''}`}>
                                <input
                                    type="text"
                                    className="input-def"
                                    onChange={e => this.setState({email: {value: e.target.value}})}
                                    value={email.value}
                                    autoComplete="off"
                                    placeholder="Email"
                                />
                                <div className="form__errorBox">
                                    <i className="icon-error" />
                                    <span> {email.error}</span>
                                </div>
                            </div>
                            <div className={`form__row ${password.error ? 'error' : ''}`}>
                                <input
                                    type="password"
                                    className="input-def"
                                    onChange={e => this.setState({password: {value: e.target.value}})}
                                    value={password.value}
                                    autoComplete="off"
                                    placeholder="Current Password"
                                />
                                <div className="form__errorBox">
                                    <i className="icon-error" />
                                    <span> {password.error}</span>
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
            show        : state.modal.getIn(['changeEmail','show']),
            callback    : state.modal.getIn(['changeEmail','callback']),
        }
    },
    (dispatch) => {
        return {
            initialize: () => dispatch(AccountActions.initialize()),
            changeEmail: (params) => dispatch(AccountActions.changeEmail(params)),
            close: () => dispatch(ModalActions.closeChangeEmail())
        }
    }
)(ModalChangeEmail);