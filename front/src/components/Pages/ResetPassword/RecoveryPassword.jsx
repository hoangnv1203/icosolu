import React from 'react';
import { connect } from 'react-redux';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link } from 'react-router';

import GlobalActions from './../../../actions/GlobalActions';
import AccountActions from './../../../actions/AccountActions';

import Constants from './../../../constants/Constants';
import Helper from './../../../services/Helper';

class RecoveryPassword extends React.Component {

    static onEnterPage(store, nextState, replace) {
        const isGuest = store.getState().account.get('isGuest');

        if(!isGuest) {
            replace('/');
        }
    }

    constructor(props) {
        super(props);

        Helper.setDocumentTitle(props.route.title);
        this.state = this.getInitializeState();
    }

    getInitializeState() {
        return {
            email: {value: '', error: null},
            reCaptchaKey: {value: '', error: null},
            loading: false,
            sended: false,
        }
    }

    componentWillMount() {
        this.props.setVisibleFooter(false);
    }

    componentWillUnmount() {
        this.props.setVisibleFooter(true);
    }

    onChangeInput(e, type) {
        this.setState({
            [type]: {
                value: type === 'email' ? e.target.value.trim() : e.target.value,
                error: null
            }
        })
    }

    onChangeReCaptcha(value) {
        this.setState({
            reCaptchaKey: {
                value: value,
                error: null
            }
        });
    }

    validate(state) {

        let newState = {
            ...state
        };

        if(!state.email.value || !Helper.validateEmail(state.email.value)) {
            newState = {
                ...newState,
                email: {
                    ...this.state.email,
                    error: 'Invalid email'
                }
            };

        }

        if(!state.reCaptchaKey.value) {
            newState = {
                ...newState,
                reCaptchaKey: {
                    ...this.state.reCaptchaKey,
                    error: 'Invalid ReCaptcha'
                }
            };
        }

        return newState;
    }

    onSubmit(e) {

        e.preventDefault();

        if(this.state.loading) {
            return false;
        }

        this.setState({
            loading: true,
            email: {
                ...this.state.email,
                error: null
            },
            reCaptchaKey: {
                ...this.state.reCaptchaKey,
                error: null
            }}, () => {

                let { email, reCaptchaKey } = this.validate(this.state);

                if(email.error || reCaptchaKey.error) {

                    this.setState({
                        loading: false,
                        email,
                        reCaptchaKey
                    });

                    return false;
                }

                this.props.recoveryPassword({
                    email: email.value,
                    'g-recaptcha-response': reCaptchaKey.value
                }).then((data) => {
                    this.setState({
                        loading: false,
                        sended: true
                    });
                }).catch((errors) => {

                    this.setState({
                        loading: false
                    });

                    this.captcha.reset();

                    this.setState({
                        reCaptchaKey: {
                            ...reCaptchaKey,
                            value: ''
                        }
                    });

                    errors = errors.errors;

                    for(let i in errors) {
                        switch (errors[i].param) {
                            case 'email':
                                this.setState({
                                    email: {
                                        ...this.state.email,
                                        error: errors[i].msg
                                    }
                                });

                                break;
                            case 'g-recaptcha-response':

                                this.setState({
                                    reCaptchaKey: {
                                        ...this.state.reCaptchaKey,
                                        error: errors[i].msg
                                    }
                                });
                                break;
                        }
                    }
                });

            });

    }

    render() {

        let introBgImage = [
            require('./../../../assets/images/intro_bg_1.svg'),
            require('./../../../assets/images/intro_bg_2.svg'),
            require('./../../../assets/images/intro_bg_3.svg'),
        ];

        let { email, reCaptchaKey, loading, sended } = this.state;

        return (
            <div className="section section__intro">
                <div className="moveBg">
                    <img src={introBgImage[0]} alt="" className="moveBg__pic moveBg__pic_1  static"/>
                    <img src={introBgImage[1]} alt="" className="moveBg__pic moveBg__pic_2  static"/>
                    <img src={introBgImage[2]} alt="" className="moveBg__pic moveBg__pic_3  static"/>
                </div>
                <div className="boxCenter__out">
                    <div className="boxCenter__in">
                        <div className="container">
                            <h2 className="h2">Solum</h2>
                            <form className={`form form-sm ${sended ? 'ready' : ''}`} onSubmit={e => this.onSubmit(e)}>
                                <div className="form__fill">
                                    <span className="form__titleCaps">Recovery Password</span>
                                    <div className={`form__row ${email.error ? 'error' : ''}`}>
                                        <input
                                            type="text"
                                            className="input-def"
                                            onChange={e => this.onChangeInput(e, 'email')}
                                            value={email.value}
                                            placeholder="Email"
                                        />
                                        <div className="form__errorBox">
                                            <i className="icon-error" />
                                            <span> {email.error}</span>
                                        </div>
                                    </div>
                                    <div className={`form__row ${reCaptchaKey.error ? 'error' : ''}`}>
                                        <div className="g-recaptcha">
                                            <ReCAPTCHA
                                                ref={(el) => { this.captcha = el; }}
                                                sitekey={Constants.RECAPTCHA_KEY}
                                                onChange={this.onChangeReCaptcha.bind(this)}
                                            />
                                        </div>
                                        <div className="form__errorBox">
                                            <i className="icon-error"/>
                                            <span> {reCaptchaKey.error}</span>
                                        </div>
                                    </div>
                                    <div className="form__btnRow">
                                        <button className={`btn btn-primary btn-stretch ${loading ? 'inProgress' : ''}`}>
                                            <span className="btn__txt">Send Request</span>
                                            <span className="btn__dynamicBox">
                                                <span>Sended...</span>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div className="form__sent">
                                    <span className="form__titleCaps">Password change initiated</span>
                                    <p>Please check your email.</p>
                                    <Link to="/login"><i className="icon-check"/></Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {

        }
    },
    (dispatch) => ({
        setVisibleFooter: (visible) => dispatch(GlobalActions.setVisibleFooter(visible)),
        recoveryPassword: (params) => dispatch(AccountActions.recoveryPassword(params))
    })
)(RecoveryPassword);