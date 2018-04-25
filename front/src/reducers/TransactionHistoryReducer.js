import { Map } from 'immutable';
import ActionConstants from '../constants/ActionConstants';

const initialState = Map({
    sortField: 'createdAt',
    sortDirection: 'desc',
    sortType: 'time',
    loadingStatus: 'done',
    showPageLoader: true,
    history: []
});

export default function TransactionHistoryReducer(state = initialState, action) {
    switch (action.type) {
        case ActionConstants.TRANSACTION_HISTORY.SET_LOADING_STATUS:
            state = state.set('loadingStatus', action.payload.loadingStatus);
            return state;
        case ActionConstants.TRANSACTION_HISTORY.SET_HISTORY:
            state = state.set('history', action.payload.history);
            return state;
        case ActionConstants.TRANSACTION_HISTORY.CHANGE_SORT:
            state = state.set('sortField', action.payload.sortField);
            state = state.set('sortDirection', action.payload.sortDirection);
            state = state.set('sortType', action.payload.sortType);
            return state;
        case ActionConstants.TRANSACTION_HISTORY.SHOW_PAGE_LOADER:
            state = state.set('showPageLoader', action.payload.showPageLoader);
            return state;
        default:
            return state;
    }
}
