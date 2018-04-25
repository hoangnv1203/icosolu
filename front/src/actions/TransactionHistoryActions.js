import {get} from './../services/Api';
import ActionConstants from '../constants/ActionConstants';
import _ from 'lodash';

/**
 *
 * @param {Array} history
 * @return {{type: string, payload: {icoInfo: *}}}
 */
function setHistory(history) {
    return {
        type: ActionConstants.TRANSACTION_HISTORY.SET_HISTORY,
        payload: {
            history: history
        }
    }
}

/**
 *
 * @param {String} sortField
 * @param {String} sortDirection
 * @param {String} sortType
 * @return {{type: string, payload: {sortField: *, sortDirection: *}}}
 */
function changeSort(sortField, sortDirection, sortType) {
    return {
        type: ActionConstants.TRANSACTION_HISTORY.CHANGE_SORT,
        payload: {
            sortField: sortField,
            sortDirection: sortDirection,
            sortType: sortType
        }
    }
}

/**
 *
 * @param {Boolean} showPageLoader
 * @return {{type: *, payload: {showPageLoader: *}}}
 */
function showPageLoader(showPageLoader) {
    return {
        type: ActionConstants.TRANSACTION_HISTORY.SHOW_PAGE_LOADER,
        payload: {
            showPageLoader: showPageLoader
        }
    }
}

/**
 *
 * @param {Array} history
 * @param {String} field
 * @param {String} direction asc|desc
 * @param {String} type number|string|time
 * @return {Array|*}
 */
function sortHistory(history, field, direction, type) {
    console.log('field, direction, type', field, direction, type);
    return _.orderBy(history, [(e) => {
        switch (type) {
            case 'number':
                return parseFloat(e[field]);
            case 'time':
                return e[field];
            default:
                return e[field];
        }

    }], [direction]);
}

class TransactionHistoryActions {

    /**
     *
     * @return {function(*, *)}
     */
    static loadHistory() {
        return (dispatch, getState) => {
            return get('/api/v1/history', {}).then(data => {

                let state = getState(),
                    sortField = state.transactionHistory.get('sortField'),
                    sortDirection = state.transactionHistory.get('sortDirection'),
                    sortType = state.transactionHistory.get('sortType');

                dispatch(setHistory(sortHistory(data, sortField, sortDirection, sortType)));
                dispatch(showPageLoader(false));

            }).catch(error => {
                //TODO::
            });

        };
    }

    /**
     *
     * @param {String} field
     * @param {String} direction asc|desc
     * @param {String} type number|string|time
     * @return {function(*, *)}
     */
    static changeSort(field, direction, type) {
        return (dispatch, getState) => {

            let state = getState();

            dispatch(changeSort(field, direction, type));
            dispatch(setHistory(sortHistory(state.transactionHistory.get('history'), field, direction, type)));

        };
    }

}

export default TransactionHistoryActions;