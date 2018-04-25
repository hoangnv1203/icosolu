import React from 'react';
import { connect } from 'react-redux';

import Header from './Layout/Header';
import Footer from './Layout/Footer';

import InfoModal from './Modals/Info';
import VideoModal from  './Modals/Video';
import ModalChangePassword from './Modals/ChangePassword';
import ModalChangeEmail from './Modals/ChangeEmail';
import ModalTFALogin from './Modals/TFALogin';

class App extends React.Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            // navigated!
            window.scrollTo(0,0);
        }
    }

    render() {
        let {children, isVisibleFooter, isGuest} = this.props;

        return (
            <div>
                <div className="wrapper">
                    <Header />
                    {children}
                </div>
                {isVisibleFooter ? <Footer /> : null}

                <InfoModal />
                {this.props.showVideoModal ? <VideoModal /> : null}
                <ModalTFALogin />
                {!isGuest ? <ModalChangeEmail /> : null}
                {!isGuest ? <ModalChangePassword /> : null}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            isGuest:            state.account.get('isGuest'),
            openModal:          state.modal.get('open'),
            isVisibleFooter:    state.global.get('isVisibleFooter'),
            showVideoModal: state.modal.getIn(['video','show'])
        }
    }
)(App);