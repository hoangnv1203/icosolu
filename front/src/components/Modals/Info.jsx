import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap4-modal';

import ModalActions from './../../actions/ModalActions';

class ModalInfo extends React.Component {

    static propTypes = {
        show: PropTypes.bool,
        title: PropTypes.string,
        description: PropTypes.string,
        icon: PropTypes.string
    }

    static defaultProps = {
        show: false,
    }

    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if(this.props.show) {
            document.body.classList.toggle('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }


    onClose(e) {
        e.preventDefault();

        if(this.props.callback && typeof this.props.callback == 'function') {
            this.props.callback();
        }

        this.props.closeModal();
    }

    render() {
        let { show, title, description, icon } = this.props;

        return (
            <div className="modal_xs">
                <Modal visible={show} onClickBackdrop={e => this.onClose(e)}>
                    <a href="" onClick={e => this.onClose(e)} type="button" className="modal-close">
                        <i className="icon-close"/>
                    </a>
                    <div className="modal-header">
                        {icon ? <i className={`modal__titleIcon ${icon}`}/> : null}
                        <span className="modal__title">{title}</span>
                    </div>
                    <div className="modal-body">
                        {description}
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary fluid" onClick={e => this.onClose(e)}>OK</button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        show                :state.modal.getIn(['info','show']),
        title               :state.modal.getIn(['info','title']),
        description         :state.modal.getIn(['info','description']),
        icon                :state.modal.getIn(['info','icon']),
        callback            :state.modal.getIn(['info','callback']),
    }),
    (dispatch) => ({
        closeModal: () => dispatch(ModalActions.closeInfo())
    })
)(ModalInfo);