import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Footer extends React.Component {
    constructor() {
        super();
    }

    render() {
        let logo = require('./../../assets/images/solum_logo.svg');
        let { activePage } = this.props;

        return (
            <footer className="footer">
                <div className="container">
                    <nav className="footerNav__list">
                        <Link to="/" className={`footerNav__link ${activePage == '/' ? 'active' : ''}`}>About</Link>
                        <Link to="/features" className={`footerNav__link ${activePage == '/features' ? 'active' : ''}`}>Features</Link>
                        <a href="/solum_whitepaper.pdf" className="footerNav__link" target="_blank">Whitepaper</a>
                        <Link to="/team" className={`footerNav__link ${activePage == '/team' ? 'active' : ''}`}>Team</Link>
                    </nav>
                    <Link to="/" className="footer__logo"><img src={logo} /></Link>
                </div>
            </footer>
        );
    }
}

export default connect(
    (state) => {
        return {
            activePage: state.routing.locationBeforeTransitions.pathname
        }
    })
(Footer);