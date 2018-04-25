import React from 'react';

class TFAError extends React.Component {

    render() {

        return (
            <div className="form__errorBox">
                <i className="icon-error"></i>
                <span>{this.props.error ? this.props.error : 'Error'}</span>
            </div>
        );
    }
}

export default TFAError;