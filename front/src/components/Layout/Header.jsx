import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames';

import PanelGuest from './../Elements/Header/PanelGuest';
import PanelUser from './../Elements/Header/PanelUser';

class Header extends React.Component {
    constructor() {
        super();
    }

    render() {

        let { activePage, isGuest } = this.props;

        return (
            <header className={classNames("header", {"full-list": !isGuest})}>
                <Link to="/" className="header__logo"><img src="/images/solum_logo.svg" /></Link>
                <nav  className="mainNav__list scrollX">
                    { !isGuest ? <Link to="/dashboard" className={`mainNav__link ${activePage == '/dashboard' ? 'active' : ''}`}>Dashboard</Link> : null }
                    { !isGuest ? <Link to="/transaction-history" className={`mainNav__link ${activePage == '/transaction-history' ? 'active' : ''}`}>Transaction History</Link> : null }
                    { isGuest ? <Link to="/" className={`mainNav__link ${activePage == '/' ? 'active' : ''}`}>About</Link> : null }
                    <Link to="/features" className={`mainNav__link ${activePage == '/features' ? 'active' : ''}`}>Features</Link>
                    <a href="/solum_whitepaper.pdf" className="mainNav__link" target="_blank">Whitepaper</a>
                    <Link to="/team" className={`mainNav__link ${activePage == '/team' ? 'active' : ''}`}>Team</Link>
                </nav>
                { isGuest ? <PanelGuest /> : <PanelUser /> }
            </header>
        );
    }
}

export default connect(
    (state) => {
        return {
            isGuest     : state.account.get('isGuest'),
            user        : state.account.get('user'),
            activePage  : state.routing.locationBeforeTransitions.pathname
        }
    }
)(Header);