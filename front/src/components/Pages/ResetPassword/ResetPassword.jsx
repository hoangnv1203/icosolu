import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import GlobalActions from './../../../actions/GlobalActions';
import AccountActions from './../../../actions/AccountActions';

import Helper from './../../../services/Helper';

class ResetPassword extends React.Component {


    constructor(props) {
        super(props);

        Helper.setDocumentTitle(props.route.title);

        const GETparams = new URLSearchParams(window.location.search);
        this.state = this.getInitializeState({
            hash: GETparams.get('token')
        });

        if(!this.state.hash)
            browserHistory.push('/');

        if(window.localStorage['resetPasswordHash'] == this.state.hash)
            browserHistory.push('/login');
    }

    getInitializeState(params) {
        return {
            hash: params.hash || null,
            password: {value: '', error: null},
            repeatPassword: {value: '', error: null},
            error: null,
            loading: false,
            sended: false,
            timeoutRedirect: 2
        }
    }

    onChangeInput(e, type) {
        this.setState({
            [type]: {
                value: e.target.value,
                error: null
            },
            error: false,
        });
    }

    componentWillMount() {
        this.props.setVisibleFooter(false);
    }

    componentWillUnmount() {
        this.props.setVisibleFooter(true);

        clearTimeout(this.state.timeoutRedirect);
    }

    validate(state) {
        if(!state.password.value || state.password.value.length < 6) {
            state.password.error = 'Password should be at least 6 characters';
        }

        if(!state.repeatPassword.value || state.repeatPassword.value.length < 6) {
            state.repeatPassword.error = 'Password should be at least 6 characters';
        }

        if(state.password.value != state.repeatPassword.value) {
            state.repeatPassword.error = 'Passwords must match';
        }

        return state;
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({
            error: false,
        });

        if(this.state.loading)
            return;

        this.setState({
            loading: true,
        });

        let { hash, password, repeatPassword } = this.validate(this.state);

        if(password.error || repeatPassword.error) {
            this.setState({
                password,
                repeatPassword,
                loading: false
            });
            return;
        }

        this.props.updatePassword({
            hash: hash,
            password: password.value
        }).then(data => {
            window.localStorage['resetPasswordHash'] = this.state.hash;
            let timeoutRedirect = setTimeout(() => {
                browserHistory.push('/login');
            },3 * 1000);

            this.setState({
                loading: false,
                sended: true,
                timeoutRedirect: timeoutRedirect
            });
        }).catch(errors => {
            this.setState({
                loading: false
            });

            errors = errors.errors;
            for(let i in errors) {
                switch (errors[i].param) {
                    case 'password':
                        password.error = errors[i].msg;
                        this.setState({
                            password
                        });
                        break;
                    default:
                        this.setState({
                            error: errors[i].msg
                        });
                        break;
                }
            }

        })
    }

    render() {
        let introBgImage = [
            require('./../../../assets/images/intro_bg_1.svg'),
            require('./../../../assets/images/intro_bg_2.svg'),
            require('./../../../assets/images/intro_bg_3.svg'),
        ];

        let { password, repeatPassword, error, loading, sended } = this.state;

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
                                    <span className="form__titleCaps">Set a new Password</span>

                                    <div style={{color: 'red'}}>{error}</div>

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
                                    <div className={`form__row ${repeatPassword.error ? 'error' : ''}`}>
                                        <input
                                            type="password"
                                            className="input-def"
                                            onChange={e => this.onChangeInput(e, 'repeatPassword')}
                                            value={repeatPassword.value}
                                            placeholder="Repeat Password"
                                        />
                                        <div className="form__errorBox">
                                            <i className="icon-error" />
                                            <span> {repeatPassword.error}</span>
                                        </div>
                                    </div>

                                    <div className="form__btnRow">
                                        <button className={`btn btn-primary btn-stretch ${loading ? 'inProgress' : ''}`}>
                                            <span className="btn__txt">Confirm</span>
                                            <span className="btn__dynamicBox">
                                                <span>Confirm...</span>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div className="form__sent">
                                    <span className="form__titleCaps">Password successfully changed!</span>
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
        updatePassword: (params) => dispatch(AccountActions.updatePassword(params))
    })
)(ResetPassword);