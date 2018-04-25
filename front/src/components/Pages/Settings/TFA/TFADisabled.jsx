import React from 'react';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';
import twoFactor from 'node-2fa';

import TFAActions from './../../../../actions/TFAActions';
import AccountActions from './../../../../actions/AccountActions';
import ModalActions from './../../../../actions/ModalActions';
import TFAError from './TFAError';

class TFADisabled extends React.Component {
    constructor() {
        super();

        this.state = {
            secret: '',
            qrCodeUrl: '',
            password: {
                value: '',
                error: null
            },
            code: {
                value: '',
                error: null
            },
            loading: false
        }
    }

    componentDidMount() {
        if(!this.props.user.tfa) {
            let newSecret = twoFactor.generateSecret({name: 'Solum', account: this.props.user.email});

            this.setState({
                secret: newSecret.secret,
                qrCodeUrl: `otpauth://totp/Solum?secret=${newSecret.secret}&issuer=${this.props.user.email}`
            });
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
            } else {
                let check = twoFactor.verifyToken(state.secret, state.code.value);
                if(!check) {
                    state.code.error = 'Invalid code';
                }
            }
        }

        return state;
    }

    onEnabledTFA(e) {
        e.preventDefault();

        this.setState({loading: true});

        let { secret, password, code } = this.validate(this.state);

        if(password.error || code.error) {
            this.setState({
                password,
                code,
                loading: false
            });
            return;
        }

        this.props.TFAEnabled({
            tfa_secret: secret,
            password: password.value
        }).then(data => {
            this.setState({loading: false});
            this.props.initialize();
            this.props.modalShowInfo({
                description: 'Two-factor authentication has been activated!'
            })
        }).catch(errors => {
            this.setState({loading: false});

            errors = errors.errors;
            for(let i in errors) {
                switch (errors[i].param) {
                    case 'password':
                        password.error = errors[i].msg;
                        this.setState(password);
                        break;
                }
            }
        })
    }

    render() {

        let { qrCodeUrl, secret, password, code, loading } = this.state;

        return (
            <form className="form" onSubmit={e => this.onEnabledTFA(e)}>
                <span className="form__titleCaps">2FA is Disabled</span>
                <div className="form__in">
                    <div className="form__qr">
                        <QRCode value={qrCodeUrl || ''} bgColor={'rgba(255, 255, 255, 0)'} size={180} level={'Q'} />
                    </div>
                    <div className="form__qrRight">
                        <div className="form__row">
                            <input
                                type="text"
                                className="input-def"
                                readOnly="true"
                                value={secret}
                            />
                        </div>
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
                <div className="form__row">
                    <button className={`btn btn-primary sm ${loading ? 'inProgress' : ''}`} disabled={loading ? true : ''}>
                        <span className="btn__txt">Enabled 2FA</span>
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
            user: state.account.get('user')
        }
    },
    (dispatch) => {
        return {
            TFAEnabled: (params) => dispatch(TFAActions.TFAEnabled(params)),
            initialize: () => dispatch(AccountActions.initialize()),
            modalShowInfo: (params) => dispatch(ModalActions.showInfo(params))
        }
    }
)(TFADisabled);