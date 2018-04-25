import numeral from 'numeral';

class CurrencyHelper {

    static convertCurrency(value) {
        return numeral(value).format('0,0[.][00000000]').replace(/,/g,' ');
    }

}

export default CurrencyHelper;