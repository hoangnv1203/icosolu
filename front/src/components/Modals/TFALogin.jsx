import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap4-modal';

import ModalActions from './../../actions/ModalActions';
import AccountActions from './../../actions/AccountActions';

class TFALogin extends React.Component {

    static propTypes = {
        show: PropTypes.bool,
        email: PropTypes.string,
        password: PropTypes.string,
        callback: PropTypes.func,
    }

    static defaultProps = {
        show: false,
    }

    constructor() {
        super();

        this.state = this.getInitializeState();
    }

    getInitializeState() {
        return {
            token: {
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
        if(!state.token.value) {
            state.token.error = 'Token is required';
        } else {
            if(state.token.value.length != 6) {
                state.token.error = 'Token should be 6-digit';
            }
        }

        return state;
    }

    onClose(e) {
        e.preventDefault();

        this.setState( this.getInitializeState());
        this.props.close();
    }

    onSend(e) {
        e.preventDefault();

        let { token } = this.validate(this.state);

        if(token.error) {
            this.setState({
                token,
                loading: false
            });

            return;
        }

        this.props.login({
            email: this.props.email,
            password: this.props.password,
            tfa_token: token.value
        }).then(() => {
            if(this.props.callback && typeof this.props.callback == 'function') {
                this.props.callback();
            }
            this.props.close();
            this.setState( this.getInitializeState());
        }).catch(errors => {
            errors = errors.errors;
            for(let i in errors) {
                switch (errors[i].param) {
                    case 'tfa_token':
                        token.error = errors[i].msg;
                        this.setState(token);
                        break;
                }
            }
        })
    }

    render() {
        let { show } = this.props;
        let { token, loading } = this.state;

        return (
            <div className="modal_xs">
                <Modal visible={show} onClickBackdrop={e => this.onClose(e)}>
                    <div className="modal-header">
                        <span className="modal__title">Two-Factor Authentication</span>
                        <a href="" onClick={e => this.onClose(e)} type="button" className="modal-close">
                            <i className="icon-close" />
                        </a>
                    </div>
                    <div className="modal-body">
                        <form className="form" onSubmit={e => this.onSend(e)}>
                            <div className={`form__row ${token.error ? 'error' : ''}`}>
                                <input
                                    type="text"
                                    className="input-def"
                                    onChange={e => this.setState({token: {value: e.target.value.replace(/[^0-9]/ig,'')}})}
                                    value={token.value}
                                    maxLength="6"
                                    autoComplete="off"
                                    placeholder="Two factor auth 6-digit Code"
                                />
                                <div className="form__errorBox">
                                    <i className="icon-error" />
                                    <span> {token.error}</span>
                                </div>
                            </div>
                            <div className="form__row">
                                <button className={`btn btn-primary fluid ${loading ? 'inProgress' : ''}`} disabled={loading ? true : ''}>
                                    <span className="btn__txt">Login</span>
                                    <span className="btn__dynamicBox">
                                        <span>Login...</span>
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
            show        :state.modal.getIn(['tfaLogin','show']),
            email       :state.modal.getIn(['tfaLogin','email']),
            password    :state.modal.getIn(['tfaLogin','password']),
            callback    :state.modal.getIn(['tfaLogin','callback']),
        }
    },
    (dispatch) => {
        return {
            close: () => dispatch(ModalActions.closeTFALogin()),
            login: (email, password) => dispatch(AccountActions.login(email,password)),
        }
    }
)(TFALogin);