import {get, post} from './../services/Api';

export default class GlobalActions {

    static setVisibleFooter(visible = true) {
        return(dispatch, getState) => {
            dispatch({
                type: 'SET_VISIBLE_FOOTER',
                payload: !!visible
            })
        }
    }

    static subscribe(email) {
        return (dispatch) => {
            return new Promise( (resolve, reject) => {
                post('/api/v1/updates/subscribe',{
                    email: email
                }).then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                })
            })
        }
    }

}