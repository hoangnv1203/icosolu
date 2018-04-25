import Constants from './../constants/Constants';

export default class Helper {

    static pad(num, size) {
        let s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    }

    static validateEmail($email) {
        let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,15})?$/;
        if(!emailReg.test( $email ) ) {
            return false;
        } else {
            return true;
        }
    }

    static setDocumentTitle(pageTitle) {
        let arr = [Constants.DOCUMENT_TITLE];

        if(Array.isArray(pageTitle)) {
            arr = arr.concat(pageTitle);
        } else {
            arr.push(pageTitle);
        }

        document.title = arr.join(' | ');
    }

}