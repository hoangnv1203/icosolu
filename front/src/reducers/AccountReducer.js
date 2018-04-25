import { Map } from 'immutable';

const initialState = Map({
    isGuest: true,
    user: null
});

export default function AccountReducer(state = initialState, action) {
    switch (action.type) {
        case 'INIT_ACCOUNT':
            state = state.set('user', action.payload);
            state = state.set('isGuest', !action.payload);
            return state;
        case 'LOGOUT':
            state = initialState;
            return state;
        default:
            return state;
    }
}
