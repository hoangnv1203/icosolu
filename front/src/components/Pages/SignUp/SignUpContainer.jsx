import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ReCAPTCHA from 'react-google-recaptcha';

import GlobalActions from './../../../actions/GlobalActions';
import AccountActions from './../../../actions/AccountActions';

import Helper from './../../../services/Helper';

import Constants from './../../../constants/Constants';

class SignUp extends React.Component {

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
        this.captcha = null;
    }

    getInitializeState() {
        return {
            email           : {value: '', error: null},
            password        : {value: '', error: null},
            repeatPassword  : {value: '', error: null},
            reCaptchaKey    : {value: '', error: null},
            loading         : false,
            sended          : false,
        }
    }

    componentWillMount() {
        this.props.setVisibleFooter(false);
    }

    componentWillUnmount() {
        this.props.setVisibleFooter(true);
    }

    onChangeInput(e, type) {
        let value = e.target.value;
        switch (type) {
            case 'email':
                value = value.trim();
                break;
        }
        this.setState({
            [type]: {
                value: value,
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
        })
    }

    validate(state) {
        if(!state.email.value || !Helper.validateEmail(state.email.value)) {
            state.email.error = 'Invalid email';
        }

        if(!state.password.value || state.password.value.length < 6) {
            state.password.error = 'Password should be at least 6 characters';
        }

        if(!state.repeatPassword.value || state.repeatPassword.value.length < 6) {
            state.repeatPassword.error = 'Password should be at least 6 characters';
        }

        if(state.password.value != state.repeatPassword.value) {
            state.repeatPassword.error = 'Passwords must match';
        }

        if(!state.reCaptchaKey.value) {
            state.reCaptchaKey.error = 'Invalid ReCaptcha';
        }

        return state;
    }

    onSubmit(e) {
        e.preventDefault();

        if(this.state.loading)
            return;

        this.setState({loading: true});

        let { email, password, repeatPassword, reCaptchaKey } = this.validate(this.state);

        if(email.error || password.error || repeatPassword.error || reCaptchaKey.error) {
            this.setState({
                email,
                password,
                repeatPassword,
                loading: false
            });

            return;
        }

        this.props.signUp({
            email: email.value,
            password: password.value,
            'g-recaptcha-response': reCaptchaKey.value
        }).then((data) => {
            this.setState({
                loading: false,
                sended: true,
            });
        }).catch((errors) => {
            this.setState({
                loading: false
            });

            this.captcha.reset();

            reCaptchaKey.value ='';
            this.setState({reCaptchaKey});

            errors = errors.errors;
            for(let i in errors) {
                switch (errors[i].param) {
                    case '':
                    case 'email':
                        email.error = errors[i].msg;
                        this.setState(email);
                        break;
                    case 'password':
                        password.error = errors[i].msg;
                        this.setState(password);
                        break;
                    case 'g-recaptcha-response':
                        reCaptchaKey.error = errors[i].msg;
                        this.setState(reCaptchaKey);
                        break;
                }
            }
        });

    }

    render() {
        let introBgImage = [
            require('./../../../assets/images/intro_bg_1.svg'),
            require('./../../../assets/images/intro_bg_2.svg'),
            require('./../../../assets/images/intro_bg_3.svg'),
        ];

        let { email, password, repeatPassword, reCaptchaKey, loading, sended } = this.state;

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
                            <h2 className="h2">Get Started</h2>
                            <form className={`form form-sm ${sended ? 'ready' : ''}`} onSubmit={e => this.onSubmit(e)}>
                                <div className="form__fill">
                                    <span className="form__titleCaps">Sign Up for Free</span>
                                    <div className={`form__row ${email.error ? 'error' : ''}`}>
                                        <input
                                            type="text"
                                            className="input-def"
                                            value={email.value}
                                            onChange={e => this.onChangeInput(e,'email')}
                                            placeholder="Email"
                                        />
                                        <div className="form__errorBox">
                                            <i className="icon-error"/>
                                            <span> {email.error}</span>
                                        </div>
                                    </div>
                                    <div className={`form__row ${password.error ? 'error' : ''}`}>
                                        <input
                                            type="password"
                                            className="input-def"
                                            value={password.value}
                                            onChange={e => this.onChangeInput(e, 'password')}
                                            placeholder="Password"
                                        />
                                        <div className="form__errorBox">
                                            <i className="icon-error"/>
                                            <span> {password.error}</span>
                                        </div>
                                    </div>
                                    <div className={`form__row ${repeatPassword.error ? 'error' : ''}`}>
                                        <input
                                            type="password"
                                            className="input-def"
                                            value={repeatPassword.value}
                                            onChange={e => this.onChangeInput(e,'repeatPassword')}
                                            placeholder="Repeat Password"
                                        />
                                        <div className="form__errorBox">
                                            <i className="icon-error"/>
                                            <span> {repeatPassword.error}</span>
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
                                            <span className="btn__txt">Register</span>
                                            <span className="btn__dynamicBox">
                                                <span>Registration...</span>
                                            </span>
                                        </button>
                                    </div>
                                    <div className="form__hint">
                                        <span>Have an Account? <Link to="/login" className="link-primary">Login</Link> to Continue</span>
                                    </div>
                                </div>
                                <div className="form__sent">
                                    <span className="form__titleCaps">Thank you for Sign Up</span>
                                    <p>We have sent you an email confirmation to the email address you provided</p>
                                    <Link to="/dashboard"><i className="icon-check"/></Link>
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
    (state) => ({

    }),
    (dispatch) => ({
        setVisibleFooter: (visible) => dispatch(GlobalActions.setVisibleFooter(visible)),
        signUp: (params) => dispatch(AccountActions.signUp(params))
    })
)(SignUp);