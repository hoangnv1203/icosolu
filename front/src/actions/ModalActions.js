import Constants from './../constants/Constants';

export default class ModalActions {

    static showInfo(params) {
        return (dispatch) => {
            return new Promise( (resolve, reject) => {
                params.title            = params.title || '';
                params.description      = params.description || '';
                params.icon             = params.icon || Constants.ICON.info;
                params.callback         = params.callback || (() => {});


                dispatch({
                    type: 'MODAL_SHOW_INFO',
                    payload: {
                        title           : params.title,
                        description     : params.description,
                        icon            : params.icon,
                        callback        : params.callback
                    }
                });
                resolve();
            })
        }
    }

    static closeInfo() {
        return (dispatch) => {
            dispatch({
                type: 'MODAL_CLOSE_INFO'
            })
        }
    }

    static showVideo(params) {
        return (dispatch) => {
            params.url = params.url || '';

            dispatch({
                type: 'MODAL_SHOW_VIDEO',
                payload: {
                    url: params.url
                }
            });

        }
    }

    static closeVideo() {
        return (dispatch) => {
            dispatch({
                type: 'MODAL_CLOSE_VIDEO'
            })
        }
    }

    static showChangePassword(params) {
        return (dispatch) => {
            dispatch({
                type: 'MODAL_SHOW_CHANGE_PASSWORD',
                payload: {
                    callback: params.callback || (() => {})
                }
            })
        }
    }

    static closeChangePassword() {
        return (dispatch) => {
            dispatch({
                type: 'MODAL_CLOSE_CHANGE_PASSWORD'
            })
        }

    }

    static showChangeEmail(params) {
        return (dispatch) => {
            dispatch({
                type: 'MODAL_SHOW_CHANGE_EMAIL',
                payload: {
                    callback: params.callback || (() => {})
                }
            })
        }
    }

    static closeChangeEmail() {
        return (dispatch) => {
            dispatch({
                type: 'MODAL_CLOSE_CHANGE_EMAIL'
            })
        }
    }

    static showTFALogin(params) {
        return (dispatch) => {
           dispatch({
               type: 'MODAL_SHOW_TFA_LOGIN',
               payload: {
                    email: params.email || '',
                    password: params.password || '',
                    callback: params.callback || (() => {}),
               }
           })
        }
    }

    static closeTFALogin() {
        return (dispatch) => {
            dispatch({
                type: 'MODAL_CLOSE_TFA_LOGIN'
            })
        }
    }


}