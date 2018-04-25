import React from 'react';
import { connect } from 'react-redux';

import TFAActions from './../../../../actions/TFAActions';
import AccountActions from './../../../../actions/AccountActions';
import ModalActions from './../../../../actions/ModalActions';
import TFAError from './TFAError';

class TFAEnabled extends React.Component {
    constructor() {
        super();

        this.state = {
            password: {
                value: '',
                error: null,
            },
            code: {
                value: '',
                error: null
            },
            loading: false
        }
    }

    validate(state) {
        if(!state.password.value) {
            state.password.error = 'Password is required';
        }

        if(!state.code.value) {
            state.code.error = 'Code is required'
        } else {
            if(state.code.value.length != 6) {
                state.code.error = 'Code should be 6-digit';
            }
        }

        return state;
    }

    onDisabledTFA(e) {
        e.preventDefault();

        this.setState({loading: true});

        let { password, code } = this.validate(this.state);

        if(password.error || code.error) {
            this.setState({
                password,
                code,
                loading: false
            });
            return;
        }

        this.props.TFADisabled({
            password: password.value,
            tfa_token: code.value
        }).then(() => {
            this.setState({loading: false});
            this.props.initialize();
            this.props.modalShowInfo({
                description: 'Two-factor authentication has been deactivated!'
            });
        }).catch(errors => {
            this.setState({loading: false});

            errors = errors.errors;
            for(let i in errors) {
                switch (errors[i].param) {
                    case 'password':
                        password.error = errors[i].msg;
                        this.setState(password);
                        break;
                    case 'tfa_token':
                        code.error = errors[i].msg;
                        this.setState(code);
                        break;
                }
            }
        })
    }

    render() {

        let { password, code, loading } = this.state;

        return (
            <form className="form" onSubmit={e => this.onDisabledTFA(e)}>
                <span className="form__titleCaps">2FA is Enabled</span>
                <div className="form__in">
                    <div className="form__qrRight">
                        <div className="stretchBox">
                            <div className={`form__row ${password.error ? 'error' : ''}`}>
                                <input
                                    type="password"
                                    className="input-def"
                                    onChange={e => this.setState({password: {value: e.target.value}})}
                                    value={password.value}
                                    placeholder="Password"
                                />
                                {password.error ? (
                                        <TFAError error={password.error} />
                                    ) : null}
                            </div>
                            <div className={`form__row ${code.error ? 'error' : ''}`}>
                                <input
                                    type="text"
                                    className="input-def"
                                    placeholder="6-digit Code"
                                    onChange={e => this.setState({code: {value: e.target.value.replace(/[^0-9]/ig,'')}})}
                                    value={code.value}
                                    maxLength="6"
                                />
                                {code.error ? (
                                        <TFAError error={code.error} />
                                    ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form__row">
                    <button className={`btn btn-primary sm ${loading ? 'inProgress' : ''}`} disabled={loading ? true : ''}>
                        <span className="btn__txt">Disabled 2FA</span>
                        <span className="btn__dynamicBox"/>
                    </button>
                </div>
            </form>
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
            TFADisabled: (params) => dispatch(TFAActions.TFADisabled(params)),
            initialize: () => dispatch(AccountActions.initialize()),
            modalShowInfo: (params) => dispatch(ModalActions.showInfo(params))
        }
    }
)(TFAEnabled);