import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import About from './components/Pages/About/AboutContainer';
import Features from './components/Pages/Features/FeaturesContainer';
import SignUp from './components/Pages/SignUp/SignUpContainer';
import Login from './components/Pages/Login/LoginContainer';
import {requireAuthentication} from './components/Auth/AuthenticatedComponent';
import Dashboard from './components/Pages/Dashboard/DashboardContainer';
import TransactionHistory from './components/Pages/TransactionHistory/TransactionHistoryContainer';
import Settings from './components/Pages/Settings/SettingsContainer';

import RecoveryPassword from './components/Pages/ResetPassword/RecoveryPassword';
import ResetPassword from './components/Pages/ResetPassword/ResetPassword';
import ConfirmEmail from './components/Pages/ConfirmEmail/ConfirmEmailContainer';

import ConfirmChangeEmail from './components/Pages/ChangeEmail/ConfirmChangeEmail';
import AcceptChangeEmail from './components/Pages/ChangeEmail/AcceptChangeEmail';
import CancelChangeEmail from './components/Pages/ChangeEmail/CancelChangeEmail';

import GetResponse from './components/Pages/GetResponse/GetResponseContainer';

import Team from './components/Pages/Team/TeamContainer';
import Page404 from './components/Pages/Page404/Page404';

export function getRoute(store) {
    return (
        <div>
            <Route path="/" component={App}>
                <IndexRoute title="About" component={About} />
                <Route path="/features" title="Features" component={Features} />
                <Route path="/sign-up" title="Sign Up" component={SignUp} onEnter={SignUp.onEnterPage.bind(this,store)}  />
                <Route path="/login" title="Login" component={Login} onEnter={Login.onEnterPage.bind(this,store)} />

                <Route path="/dashboard" title="Dashboard" component={requireAuthentication(Dashboard)} />
                <Route path="/transaction-history" title="Transaction History" component={requireAuthentication(TransactionHistory)} />

                <Route path="/settings" title="Settings" component={requireAuthentication(Settings)} />

                <Route path="/recovery-password" title="Recovery Password" component={RecoveryPassword} onEnter={RecoveryPassword.onEnterPage.bind(this,store)}  />
                <Route path="/reset-password" title="Reset Password" component={ResetPassword} />
                <Route path="/confirm-email" component={ConfirmEmail} />

                <Route path="/change-email/confirm" component={ConfirmChangeEmail} />
                <Route path="/change-email/accept" component={AcceptChangeEmail} />
                <Route path="/change-email/cancel" component={CancelChangeEmail} />

                <Route path="/getresponse" component={GetResponse} />

                <Route path="/team" title="Team" component={Team} />

                <Route path='*' exact={true} component={Page404} />
            </Route>

        </div>
    )
};