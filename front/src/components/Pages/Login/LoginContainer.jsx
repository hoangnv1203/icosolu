import React from 'react';
import queryString from 'query-string';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import GlobalActions from './../../../actions/GlobalActions';
import AccountActions from './../../../actions/AccountActions';
import ModalActions from './../../../actions/ModalActions';

import Helper from './../../../services/Helper';

class Login extends React.Component {

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
            password: {value: '', error: null},
            error: null,
            loading: false
        }
    }

    componentWillMount() {
        this.props.setVisibleFooter(false);
    }

    componentWillUnmount() {
        this.props.setVisibleFooter(true);
    }

    validate(state) {
        if(!state.email.value || !Helper.validateEmail(state.email.value)) {
            state.email.error = 'Invalid email';
        }

        if(!state.password.value) {
            state.password.error = 'Password is empty';
        }

        return state;
    }

    onChangeInput(e, type) {
        this.setState({
            [type]: {
                value: type === 'email' ? e.target.value.trim() : e.target.value,
                error: null
            },
            error: null
        })
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({
            error: null
        });

        if(this.state.loading)
            return;

        this.setState({
            loading: true
        });

        let { email, password } = this.validate(this.state);

        if(email.error || password.error) {
            this.setState({
                email,
                password,
                loading: false
            });
            return;
        }

        this.props.login({
            email: email.value,
            password: password.value
        }).then(() => {
            this.authSuccess();
        }).catch((errors) => {
            this.setState({loading: false});

            errors = errors.errors;
            for(let i in errors) {
                switch (errors[i].param) {
                    case 'email':
                    case 'password':
                        this.setState({
                            error: errors[i].msg
                        });
                        break;
                    case 'tfa_token':
                        this.props.modalShowTFALogin({
                            email: email.value,
                            password: password.value,
                            callback: () => {
                                this.authSuccess();
                            }
                        });
                        break;
                }
            }

        })
    }

    authSuccess() {
        this.setState(this.getInitializeState());
        this.props.initialize().then(() => {

            let parsed = queryString.parse(location.search);

            if (parsed && parsed.next) {
                browserHistory.push(parsed.next);
            } else {
                browserHistory.push('/dashboard');
            }

        });
    }



    render() {
        let introBgImage = [
            require('./../../../assets/images/intro_bg_1.svg'),
            require('./../../../assets/images/intro_bg_2.svg'),
            require('./../../../assets/images/intro_bg_3.svg'),
        ];

        let { email, password, error, loading } = this.state;

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
                            <form className="form form-sm" onSubmit={e => this.onSubmit(e)}>
                                <div className="form__fill">
                                    <span className="form__titleCaps">Login</span>

                                    <div style={{color: 'red'}}>{error}</div>

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
                                    <div className={`form__row ${password.error ? 'error' : ''}`}>
                                        <input
                                            type="password"
                                            className="input-def"
                                            onChange={e => this.onChangeInput(e, 'password')}
                                            value={password.value}
                                            placeholder="Password"
                                        />
                                        <div className="form__errorBox">
                                            <i className="icon-error" />
                                            <span> {password.error}</span>
                                        </div>
                                    </div>
                                    <div className="form__row">
                                        <Link to="/recovery-password" className="link-primary">Forgot Your Password?</Link>
                                    </div>
                                    <div className="form__btnRow">
                                        <button className={`btn btn-primary btn-stretch ${loading ? 'inProgress' : ''}`}>
                                            <span className="btn__txt">Login</span>
                                            <span className="btn__dynamicBox">
                                                <span>Login...</span>
                                            </span>
                                        </button>
                                    </div>
                                    <div className="form__hint">
                                        <span>Don't Have an Account? Please <Link to="/sign-up" className="link-primary">Sign Up</Link> for Free</span>
                                    </div>
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
        login: (params) => dispatch(AccountActions.login(params)),
        initialize: () => dispatch(AccountActions.initialize()),
        modalShowTFALogin: (params) => dispatch(ModalActions.showTFALogin(params))
    })
)(Login);