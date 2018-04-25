import {get, post} from './../services/Api';

export default class TFAActions {

    static TFAEnabled(params) {
        return (dispatch) => {
            return new Promise( (resolve, reject) => {
                post('/api/v1/settings/tfa/enable',params).then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                })
            })
        }
    }

    static TFADisabled(params) {
        return (dispatch) => {
            return new Promise( (resolve, reject) => {
                post('/api/v1/settings/tfa/disable', params).then(data =>{
                    resolve(data);
                }).catch(error => {
                    reject(error);
                })
            })
        }
    }

}