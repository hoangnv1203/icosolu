import { Map, List, fromJS } from 'immutable';

const initialState = Map({
    info: {
        show: false,
        title: '',
        description: '',
        icon: null,
        callback: () => {}
    },
    video: {
        show: false,
        url: ''
    },
    changePassword: {
        show: false,
        callback: () => {}
    },
    changeEmail: {
        show: false,
        callback: () => {}
    },
    tfaLogin: {
        show: false,
        email: '',
        password: '',
        callback: () => {}
    }
});

export default function ModalReducer(state = initialState, action) {
    switch (action.type) {
        case 'MODAL_SHOW_INFO':
            state = state.setIn(['info'], fromJS({
                show        : true,
                title       : action.payload.title,
                description : action.payload.description,
                icon        : action.payload.icon,
                callback    : action.payload.callback || (() => {})
            }));
            return state;
        case 'MODAL_CLOSE_INFO':
            state = state.setIn(['info'], fromJS({
                show        : false,
                title       : '',
                description : '',
                icon        : null,
                callback    : (() => {})
            }));
            return state;



        case 'MODAL_SHOW_VIDEO':
            state = state.setIn(['video'], fromJS({
                show: true,
                url: action.payload.url
            }));
            return state;
        case 'MODAL_CLOSE_VIDEO':
            state = state.setIn(['video'], fromJS({
                show: false,
                url: ''
            }));
            return state;



        case 'MODAL_SHOW_CHANGE_PASSWORD':
            state = state.setIn(['changePassword'], fromJS({
                show          : true,
                callback      : action.payload.callback || (() => {})
            }));
            return state;
        case 'MODAL_CLOSE_CHANGE_PASSWORD':
            state = state.setIn(['changePassword'], fromJS({
                show          : false,
                callback      : (() => {})
            }));
            return state;



        case 'MODAL_SHOW_CHANGE_EMAIL':
            state = state.setIn(['changeEmail'], fromJS({
                show          : true,
                callback      : action.payload.callback || (() => {})
            }));
            return state;
        case 'MODAL_CLOSE_CHANGE_EMAIL':
            state = state.setIn(['changeEmail'], fromJS({
                show          : false,
                callback      : (() => {})
            }));
            return state;



        case 'MODAL_SHOW_TFA_LOGIN':
            state = state.setIn(['tfaLogin'], fromJS({
                show          : true,
                email         : action.payload.email,
                password      : action.payload.password,
                callback      : action.payload.callback || (() => {})
            }));
            return state;
        case 'MODAL_CLOSE_TFA_LOGIN':
            state = state.setIn(['tfaLogin'], fromJS({
                show          : false,
                email         : '',
                password      : '',
                callback      : (() => {})
            }));
            return state;



        default:
            return state;
    }
}
