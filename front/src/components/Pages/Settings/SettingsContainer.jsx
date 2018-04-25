import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import AccountSettings from './Account/AccountSettingsContainer';
import TFAContainer from './TFA/TFAContainer';

import GlobalActions from './../../../actions/GlobalActions';
import Helper from './../../../services/Helper';

class SettingsContainer extends React.Component {

    constructor(props) {
        super(props);
        Helper.setDocumentTitle(props.route.title);
    }

    componentWillMount() {
        this.props.setVisibleFooter(false);
    }

    componentWillUnmount() {
        this.props.setVisibleFooter(true);
    }

    componentDidUpdate(prevProps) {

        if(this.props.isGuest) {
            browserHistory.push('/');
        }
    }

    render() {

        let introBgImage = [
            require('./../../../assets/images/intro_bg_2.svg'),
            require('./../../../assets/images/intro_bg_3.svg'),
        ];

        return (
            <div className="section section__def section__settings">
                <div className="moveBg">
                    <img src={introBgImage[0]} alt="" className="moveBg__pic moveBg__pic_2  static"/>
                    <img src={introBgImage[1]} alt="" className="moveBg__pic moveBg__pic_4  static"/>
                </div>
                <div className="boxCenter__out">
                    <div className="boxCenter__in">
                        <div className="container">
                            <div className="row">
                                <AccountSettings />
                                <TFAContainer />
                            </div>

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
            isGuest: state.account.get('isGuest')
        }
    },
    (dispatch) => {
        return {
            setVisibleFooter: (visible) => dispatch(GlobalActions.setVisibleFooter(visible)),
        }
    }
)(SettingsContainer);