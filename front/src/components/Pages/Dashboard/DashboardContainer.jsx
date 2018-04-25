import React from 'react';
import { connect } from 'react-redux';
import {BigNumber} from 'bignumber.js';
import classNames from 'classnames';
import QRCode from 'qrcode.react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import CurrencyHelper from '../../../helpers/CurrencyHelper';
import GlobalActions from './../../../actions/GlobalActions';
import DashboardActions from './../../../actions/DashboardActions';
import IcoTimer from './IcoTimer';
import Helper from './../../../services/Helper';

class DashboardContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeWallet: 'BTC',
            dropDownIsOpen: false
        };

        this.closeDropDown = this.closeDropDown.bind(this);

        Helper.setDocumentTitle(props.route.title);

    }

    componentDidMount() {
        document.addEventListener('click', this.closeDropDown, false);
    }

    componentWillMount() {
        this.props.setVisibleFooter(false);
        this.props.loadInfo();
    }

    componentWillUnmount() {
        this.props.setVisibleFooter(true);
        document.removeEventListener('click', this.closeDropDown, false);
    }

    generateAddresses(e) {
        e.preventDefault();
        this.props.generateAddresses();
    }

    closeDropDown() {
        this.setState({dropDownIsOpen: false});
    }

    toggleDropDown(e) {
        this.setState({dropDownIsOpen: !this.state.dropDownIsOpen});
        e.nativeEvent.stopImmediatePropagation();
    }

    selectDropDownWallet(coin) {
        this.setState({activeWallet: coin})
    }

    render() {

        let wallets = this.props.user.wallets,
            walletsHashMap = {},
            imageMap = {
                BTC: 'coin_bitcoin.svg',
                LTC: 'coin_litcoin.svg',
                ZEC: 'coin_zcash.svg',
                ETH: 'coin_eth.svg',
                SOL: 'coin_solum.svg'
            },
            fullNameMap = {
                BTC: 'BITCOIN',
                LTC: 'LITECOIN',
                ZEC: 'ZCASH',
                ETH: 'ETHEREUM',
            },
            coinsOrder = ['SOL', 'BTC', 'LTC', 'ETH', 'ZEC'];

        let solBalanceBN = new BigNumber(0);

        wallets.forEach((wallet) => {
            walletsHashMap[wallet.type] = wallet;
            solBalanceBN = solBalanceBN.plus(wallet.balance_exchanged);
        });

        walletsHashMap['SOL'] = {
            type: 'SOL',
            balance: solBalanceBN.toString(10),
            balance_exchanged: '0'
        };

        let currentWallet = this.props.user.wallets.find((wallet) => {
                return wallet.type === this.state.activeWallet;
            }),
            exchangeRatesHash = {},
            totalCollectedCoinsExchanged = new BigNumber(0),
            collectedCoinsHash = {},
            progress = 0,
            currentMinimalPayment = 0;

        if (this.props.icoInfo) {

            this.props.icoInfo.exchange_rates.forEach((exchangeRate) => {
                exchangeRatesHash[exchangeRate.coin] = exchangeRate;
            });

            totalCollectedCoinsExchanged = totalCollectedCoinsExchanged.plus(this.props.icoInfo.total_collected);

            this.props.icoInfo.collected_coins.forEach((collectedCoin) => {
                collectedCoinsHash[collectedCoin.coin] = collectedCoin;
            });

            let percentBN = totalCollectedCoinsExchanged.dividedBy(this.props.icoInfo.money_need_to_collect).mul(100);

            if (percentBN.gt(0) && percentBN.lt(0.2)) {
                progress = 0.2; // view fix
            } else if(percentBN.gt(100)) {
                progress = 100;
            } else {
                progress = percentBN.toString(10);
            }

            if (currentWallet) {
                let minPaymentObj = this.props.icoInfo.minimal_payments.find((payment) => {
                    return payment.coin === currentWallet.type;
                });

                if (minPaymentObj) {
                    currentMinimalPayment = minPaymentObj.amount;
                }
            }

        }

        return (
            <div className="wrapper__in">
                <div className="sidebar__box">
                    <span className="sidebar__title">Balance</span>
                    <div className="balance__list">
                        {coinsOrder.map((coin) => {

                            let wallet = walletsHashMap[coin];

                            return (
                                <div key={coin} className="balance__item">
                                    <div className="balance__pic">
                                        <img src={"images/" + imageMap[coin]} alt={coin} />
                                    </div>
                                    <div className="balance__info">
                                        <span className="balance__current">{wallet ? CurrencyHelper.convertCurrency(wallet.balance_plus_lte_zero) : 0}</span>
                                        <span> {coin}</span>
                                        {coin === 'SOL' ? null : <span className="balance__total">{wallet ? CurrencyHelper.convertCurrency(wallet.balance_exchanged) : 0} SOL</span>}
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>

                <div className="section section__defStaticLeft">
                    <div className="moveBg">
                        <img src="images/intro_bg_2.svg" alt="" className="moveBg__pic moveBg__pic_2 static" />
                        <img src="images/intro_bg_3.svg" alt="" className="moveBg__pic moveBg__pic_4 static" />
                    </div>
                    <div className="section__in">
                        <div className="container">
                            {this.props.icoInfo ?

                                <div>

                                    <IcoTimer time={this.props.icoInfo.end_ico_time} />

                                    <div className="contact">
                                        <p className="contact__title">ICO Smart Details</p>
                                        <p className="contact__body">Contract Address: <span>{this.props.icoInfo.contract_address}</span></p>
                                    </div>

                                    <div className="currency__box">
                                        {coinsOrder.map((coin) => {

                                            if (coin === 'SOL') {
                                                return null;
                                            }

                                            return (
                                                <div key={coin} className="currency__item">

                                                    <div className="currency__pic">
                                                        <img src={"images/" + imageMap[coin]} alt={coin}/>
                                                    </div>

                                                    <span className="currency__caption">{fullNameMap[coin]}</span>
                                                    <span className="currency__exchange">1 {coin} = {exchangeRatesHash[coin] ? CurrencyHelper.convertCurrency(new BigNumber(exchangeRatesHash[coin]['exchange_rate_to_main_coin']).toFixed(8)) : 0} SOL</span>
                                                    <span className="currency__total">{collectedCoinsHash[coin] ? CurrencyHelper.convertCurrency(new BigNumber(collectedCoinsHash[coin]['amount']).toFixed(8)) : 0} {coin}</span>
                                                    <span className="currency__usd">{exchangeRatesHash[coin] && collectedCoinsHash[coin] && collectedCoinsHash[coin]['amount'] > 0 ? ((new BigNumber(collectedCoinsHash[coin]['amount'])).mul(exchangeRatesHash[coin]['exchange_rate_usd_minus_fee']).toFixed(2)): 0} USD</span>
                                                </div>
                                            );

                                        })}
                                    </div>

                                    <div className="progress__wrap">

                                        <div className="progress__title">
                                            <div className="">{CurrencyHelper.convertCurrency(totalCollectedCoinsExchanged.toString(10))} SOL</div>
                                            <div className="text-sm">raised</div>
                                        </div>
                                        <div className="progress__bar">
                                            <div className="progress__barDone" style={{width: progress + '%'}}></div>
                                            <div className="progress__value">
                                                <div className="item">0 SOL</div>
                                                <div className="item">{CurrencyHelper.convertCurrency(this.props.icoInfo.money_need_to_collect)} SOL</div>
                                            </div>
                                        </div>

                                        {/*<div className="progress__box">*/}
                                            {/*<span className="progress__base"></span>*/}
                                            {/*<span className="progress__bar" style={{width: totalCollectedCoinsExchanged.dividedBy(this.props.icoInfo.money_need_to_collect).mul(100).toString(10) + '%'}}>*/}
                                                {/*<span className="gradient"></span>*/}
                                                {/*<span className="progress__value" >{CurrencyHelper.convertCurrency(totalCollectedCoinsExchanged.toString(10))} SOL</span>*/}
                                            {/*</span>*/}
                                            {/*<div className="progress__footer">*/}
                                                {/*<div className="progress__totalInv">*/}
                                                    {/*<span className="value">{this.props.icoInfo.count_investors}</span>*/}
                                                    {/*<span className="caption">Total Investors</span>*/}
                                                {/*</div>*/}
                                                {/*<div className="progress__total">{CurrencyHelper.convertCurrency(this.props.icoInfo.money_need_to_collect)} SOL</div>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                                :
                                <img src="images/loader.gif" alt="Loading..."/>
                            }

                            {(this.props.user.is_confirmed && this.props.user.wallets.length) ?
                                (
                                    <div className="address__box qr">
                                        <div className="address__boxIn">
                                            <div className="address__qr">
                                                {currentWallet ?
                                                    <QRCode value={currentWallet.address} />
                                                    : null}

                                            </div>
                                            <div className="address__in">
                                                <div className="address__dropdown">
                                                    <div onClick={this.toggleDropDown.bind(this)} className={classNames("dropdown__box", {open: this.state.dropDownIsOpen})}>
                                                        <span className="dropdown__current">{this.state.activeWallet}</span>
                                                        <div className="dropdown__menu">
                                                            {this.props.user.wallets.sort((a, b) => {
                                                                return coinsOrder.indexOf(a.type) - coinsOrder.indexOf(b.type);
                                                            }).map((wallet) => {
                                                                return (<div key={wallet.type} onClick={this.selectDropDownWallet.bind(this, wallet.type)} className={classNames("dropdown__item", {active: wallet.type === this.state.activeWallet})}>{wallet.type}</div>);
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div className="stretchBox">
                                                        <div className="address__input">{currentWallet ? currentWallet.address: null}</div>
                                                    </div>
                                                </div>
                                                <div className="address__info">
                                                    <CopyToClipboard text={currentWallet ? currentWallet.address: null}>
                                                        <a onClick={(e) => {e.preventDefault()}} href="#copy-address" className="btn btn-primary">Copy Wallet Address</a>
                                                    </CopyToClipboard>
                                                    <p>Minimal Payment:<br/>
                                                        <span>{currentMinimalPayment} {currentWallet.type}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                                : null}


                            {this.props.generateAddressesInProcess ?
                                (<div className="address__box">
                                    <div className="address__boxIn">
                                        <span className="address__title">Address Generation...</span>
                                        <img src="images/loader.gif" alt=""/>
                                    </div>
                                </div>)
                            :
                                null
                            }


                            {(!this.props.generateAddressesInProcess && this.props.user.is_confirmed && !this.props.user.wallets.length) ?

                                <div className="address__box">
                                    <div className="address__boxIn">
                                        <span className="address__title">Create addresses to get started</span>
                                        <a onClick={this.generateAddresses.bind(this)} href="#generate-addresses" className="btn btn-primary md">Generate Addresses</a>
                                    </div>
                                </div>

                                : null}



                            {(!this.props.user.is_confirmed)
                                ?
                                (
                                    <div className="address__box">
                                        <div className="address__boxIn">
                                            <span className="address__title">Addresses are not available yet.</span>
                                            <div className="address__txt">
                                                <p>Please check your email and confirm your account.</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                                : null
                            }

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            isGuest: state.account.get('isGuest'),
            user: state.account.get('user'),
            generateAddressesInProcess: state.dashboard.get('generateAddressesInProcess'),
            icoInfo: state.dashboard.get('icoInfo')
        }
    },
    {
        generateAddresses: DashboardActions.generateAddresses,
        loadInfo: DashboardActions.loadIcoInfo,
        setVisibleFooter: GlobalActions.setVisibleFooter
    }
)(DashboardContainer);