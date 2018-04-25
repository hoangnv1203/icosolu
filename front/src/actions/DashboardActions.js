import {get, post} from './../services/Api';
import ActionConstants from '../constants/ActionConstants';
import ModalActions from './ModalActions';
import Constants from './../constants/Constants';

/**
 *
 * @param {Boolean} inProcess
 * @return {{type: string, payload: {generateAddressesInProcess: *}}}
 */
function setGenerateAddressesInProcess(inProcess) {
    return {
        type: ActionConstants.DASHBOARD.SET_GENERATE_ADDRESSES_IN_PROCESS,
        payload: {
            generateAddressesInProcess: inProcess
        }
    };
}

/**
 *
 * @param {Object} info
 * @return {{type: string, payload: {icoInfo: *}}}
 */
function setIcoInfo(info) {
    return {
        type: ActionConstants.DASHBOARD.SET_ICO_INFO,
        payload: {
            icoInfo: info
        }
    };
}

class DashboardActions {

    static loadIcoInfo() {
        return (dispatch) => {
            return get('/api/v1/ico/info', {}).then(data => {
                dispatch(setIcoInfo(data));
            }).catch(error => {});
        };
    }

    static generateAddresses() {
        return (dispatch, getState) => {
            return new Promise( (resolve, reject) => {

                let state = getState();

                if (state.dashboard.get('generateAddressesInProcess')) {
                    return false;
                }

                dispatch(setGenerateAddressesInProcess(true));

                return post('/api/v1/addresses/generate', {}).then(data => {

                    dispatch({
                        type: 'INIT_ACCOUNT',
                        payload: data
                    });

                    dispatch(setGenerateAddressesInProcess(false));

                    resolve();

                }).catch(respErrors => {


                    dispatch(ModalActions.showInfo({
                        description: respErrors && respErrors.errors && respErrors.errors[0] ? respErrors.errors[0].msg : 'Unknown Error!',
                        icon: Constants.ICON.error
                    }));

                    console.log(respErrors);

                    dispatch(setGenerateAddressesInProcess(false));

                    resolve();
                });

            });
        }
    }

}

export default DashboardActions