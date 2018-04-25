import React from 'react';
import { connect } from 'react-redux';

import GlobalActions from './../../../actions/GlobalActions';
import Helper from './../../../services/Helper';

import ModalActions from './../../../actions/ModalActions';

import Constants from './../../../constants/Constants';

class Subscribe extends React.Component {
    constructor() {
        super();

        this.state = this.getInitialize();
    }

    getInitialize() {
        return {
            email: '',
            error: null,
            loading: false
        }
    }

    validate(state) {
        if(!state.email || !Helper.validateEmail(state.email)) {
            state.error = 'Invalid email';
        }

        return state;
    }

    onChange(e) {
        this.setState({
            email: e.target.value.trim(),
            error: null,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({
            loading: true
        });


        if(this.state.loading)
            return;

        let { email, error } = this.validate(this.state);

        document.getElementById("getresponse_form").src = "/getresponse?email="+email;

        if(error) {
            this.setState({
                error,
                loading: false
            });
            return;
        }

        this.props.subscribe(email).then(data => {
            this.setState(this.getInitialize());

            this.props.modalShowInfo({
                title: 'Thank you for your interest',
                description: "We'll keep you updated."
            });
        }).catch(errors => {
            this.setState({
                error: true,
                loading: false
            });

            errors = errors.errors;
            this.props.modalShowInfo({
                description: errors[0].msg,
                icon: Constants.ICON.error
            });
        });
    }

    render() {
        let { email, error, loading } = this.state;

        return (
            <form className="form form-subs" onSubmit={e => this.onSubmit(e)}>
                <div className={`form__row ${error ? 'error' : ''}`}>
                    <button className={`btn btn-primary form__inputBtnRight ${loading ? 'inProgress' : ''}`}>
                        <span className="btn__txt">Subscribe</span>
                        <span className="btn__dynamicBox">
                            <span>Subscribe...</span>
                        </span>
                    </button>
                    <div className="stretchBox">
                        <input
                            type="text"
                            className="input input-def"
                            value={email}
                            onChange={e => this.onChange(e)}
                            placeholder="example@mail.com"
                        />
                    </div>
                </div>
            </form>
        );
    }
}

export default connect(
    (state) => ({

    }),
    (dispatch) => ({
        subscribe: (email) => dispatch(GlobalActions.subscribe(email)),
        modalShowInfo: (params) => dispatch(ModalActions.showInfo(params))
    })
)(Subscribe);