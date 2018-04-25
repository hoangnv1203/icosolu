import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap4-modal';
import ModalActions from './../../actions/ModalActions';
import ReactDOM from 'react-dom';
import "../../../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';

class ModalVideo extends React.Component {

    static propsTypes = {
        show: PropTypes.bool,
        url: PropTypes.string.isRequired
    }

    static defaultProps = {
        show: false
    }

    constructor(props) {
        super(props);
        this.state = {
            height: 0
        };
    }

    onClose(e) {
        e.preventDefault();
        this.refs.player.pause();
        this.props.closeModal();
    }

    componentDidMount() {
        this.refs.player.play();
    }

    render() {
        let { show, url } = this.props;

        return (
            <div className="modal_md modal_fill" >
                <Modal ref={element => this.modalRef = element} visible={show} onClickBackdrop={e => this.onClose(e)}>
                    <a href="" onClick={e => this.onClose(e)} type="button" className="modal-close">
                        <i className="icon-close" />
                    </a>
                    <Player ref="player" autoPlay={true}>
                        <source src={url} />
                    </Player>
                </Modal>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            show: state.modal.getIn(['video','show']),
            url: state.modal.getIn(['video','url']),
        }
    },
    (dispatch) => {
        return {
            closeModal: () => dispatch(ModalActions.closeVideo())
        }
    }
)(ModalVideo);