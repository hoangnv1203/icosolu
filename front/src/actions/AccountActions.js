import {get, post} from './../services/Api';
import { push } from 'react-router-redux';

export default class AccountActions {

    static initialize() {
        return (dispatch, getState) => {
            return new Promise( (resolve, reject) => {
                get('/api/v1/users/me', {}).then(data => {
                    let state = getState(),
                        account = state.account;

                    if (!account.get('user') || (account.get('user') && new Date(account.get('user').updated_at) < new Date(data.updated_at))) {
                        dispatch({
                            type: 'INIT_ACCOUNT',
                            payload: data
                        });
                    }

                    resolve();
                }).catch(error => {

                    dispatch({
                        type: 'INIT_ACCOUNT',
                        payload: null
                    });

                    resolve();
                });
            })
        }
    }

    static signUp(params) {
        return (dispatch, getState) => {
            return new Promise( (resolve, reject) => {
                post('/api/v1/sign-up', params).then(data => {
                    resolve(data);
                    dispatch(this.initialize());
                }).catch(error => {
                    reject(error);
                })
            })
        }
    }

    static login(params) {
        return (dispatch) => {
            return new Promise( (resolve, reject) => {
                post('/api/v1/sign-in',params).then((data) => {
                    resolve(data);
                }).catch((error) => {
                    reject(error);
                })
            })
        }
    }

    static logout() {
        return (dispatch) => {
            post('/api/v1/logout',{}).then(data => {
                dispatch({
                    type: 'LOGOUT',
                    payload: {}
                });

                dispatch(push('/'));

            }).catch(error => {
                if(error.code === 403) {
                    window.location.href = '/';
                }
            })
        }
    }

    static recoveryPassword(params) {
        return (dispatch) => {
            return new Promise( (resolve, reject) => {
                post('/api/v1/password-recovery/create',params).then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                })
            })
        }
    }

    static updatePassword(params) {
        return (dispatch) => {
            return new Promise( (resolve, reject) => {
                post('/api/v1/password-recovery/change',params).then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                })
            })
        }
    }

    static confirmEmail(hash) {
        return (dispatch) => {
            return new Promise( (resolve, reject) => {
                post('/api/v1/users/confirm',{
                    hash: hash
                }).then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                })
            })
        }
    }

    static changePassword(params) {
        return (dispatch) => {
            return new Promise( (resolve, reject) => {
                post('/api/v1/settings/password/change',params).then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                })
            })
        }
    }

    static changeEmail(params) {
        return (dispatch) => {
            return new Promise( (resolve, reject) => {
                post('/api/v1/settings/email/change', params).then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                })
            })
        }
    }

    static cancelNewEmail(params) {
        return (dispatch) => {
            return new Promise( (resolve, reject) => {
                post('/api/v1/settings/email/new/cancel', params).then(data => {
                    resolve(data);
                }).catch(error  => {
                    reject(error);
                })
            })
        }
    }

    static acceptNewEmail(params) {
        return (dispatch) => {
            return new Promise( (resolve, reject) => {
                post('/api/v1/settings/email/new/accept', params).then(data => {
                    resolve(data);
                }).catch(error  => {
                    reject(error);
                })
            })
        }
    }

    static confirmNewEmail(params) {
        return (dispatch) => {
            return new Promise( (resolve, reject) => {
                post('/api/v1/settings/email/new/confirm', params).then(data => {
                    resolve(data);
                }).catch(error  => {
                    reject(error);
                })
            })
        }
    }

    static resendEmail() {
        return (dispatch) => {
            return new Promise( (resolve, reject) => {
                post('/api/v1/settings/email/confirmation/send').then(data => {
                    resolve(data);
                }).catch(error  => {
                    reject(error);
                })
            })
        }
    }
}