import { Map } from 'immutable';
import ActionConstants from '../constants/ActionConstants';

const initialState = Map({
    generateAddressesInProcess: false,
    icoInfo: null
});

export default function DashboardReducer(state = initialState, action) {
    switch (action.type) {
        case ActionConstants.DASHBOARD.SET_GENERATE_ADDRESSES_IN_PROCESS:
            state = state.set('generateAddressesInProcess', action.payload.generateAddressesInProcess);
            return state;
        case ActionConstants.DASHBOARD.SET_ICO_INFO:
            state = state.set('icoInfo', action.payload.icoInfo);
            return state;
        default:
            return state;
    }
}
