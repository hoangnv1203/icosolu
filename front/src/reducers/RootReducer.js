import React from 'react';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import globalReducer from './GlobalReducer';
import accountReducer from './AccountReducer';
import modalReducer from './ModalReducer';
import dashboardReducer from './DashboardReducer';
import transactionHistoryReducer from './TransactionHistoryReducer';

const rootReducer = combineReducers({
    routing: routerReducer,

    transactionHistory: transactionHistoryReducer,
    dashboard: dashboardReducer,
    global: globalReducer,
    account: accountReducer,
    modal: modalReducer,
});

export default rootReducer;