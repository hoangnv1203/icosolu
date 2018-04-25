import { Map } from 'immutable';

const initialState = Map({
   isVisibleFooter: true
});

export default function GlobalReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_VISIBLE_FOOTER':
            state = state.set('isVisibleFooter', action.payload);
            return state;
        default:
            return state;
    }
}
