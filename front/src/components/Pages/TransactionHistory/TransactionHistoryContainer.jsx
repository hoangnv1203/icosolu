import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
import classNames from 'classnames';
import GlobalActions from './../../../actions/GlobalActions';
import TransactionHistoryActions from './../../../actions/TransactionHistoryActions';
import Helper from './../../../services/Helper';

class TransactionHistoryContainer extends React.Component {

    constructor(props) {
        super(props);
        Helper.setDocumentTitle(props.route.title);
    }

    componentWillMount() {
        this.props.setVisibleFooter(false);
        this.props.loadHistory();
    }

    componentWillUnmount() {
        this.props.setVisibleFooter(true);
    }

    sortBy(field, direction, type, e) {
        e.preventDefault();
        this.props.changeSort(field, direction, type);
    }

    render() {

        let {sortField, sortDirection} = this.props;

        if (this.props.showPageLoader) {
            return (
                <div className="section section__intro">
                    <div className="table__box">
                        <img src="images/loader.gif" alt="Loading..."/>
                    </div>
                </div>
            );
        }


        return (
            <div className="section section__intro">
                <div className="table__box table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    <span onClick={this.sortBy.bind(this, 'createdAt', sortDirection === 'desc' ? 'asc' : 'desc', 'time')} className={classNames("table__title table__sorting", {active: sortField === 'createdAt'}, sortField === 'createdAt' ? sortDirection : null)}>date</span>
                                </th>
                                <th>
                                    <span onClick={this.sortBy.bind(this, 'from_addresses', sortDirection === 'desc' ? 'asc' : 'desc', 'string')} className={classNames("table__title table__sorting", {active: sortField === 'from_addresses'}, sortField === 'from_addresses' ? sortDirection : null)}>Sender address</span>
                                </th>
                                <th>
                                    <span onClick={this.sortBy.bind(this, 'address', sortDirection === 'desc' ? 'asc' : 'desc', 'string')} className={classNames("table__title table__sorting", {active: sortField === 'address'}, sortField === 'address' ? sortDirection : null)}>receiver address</span>
                                </th>
                                <th>
                                    <span onClick={this.sortBy.bind(this, 'coin', sortDirection === 'desc' ? 'asc' : 'desc', 'string')} className={classNames("table__title table__sorting", {active: sortField === 'coin'}, sortField === 'coin' ? sortDirection : null)}>Currency</span>
                                </th>
                                <th className="text_r mob_l">
                                    <span onClick={this.sortBy.bind(this, 'amount', sortDirection === 'desc' ? 'asc' : 'desc', 'number')} className={classNames("table__title table__sorting", {active: sortField === 'amount'}, sortField === 'amount' ? sortDirection : null)}>Amount in Currency</span>
                                </th>
                                <th className="text_r mob_l">
                                    <span onClick={this.sortBy.bind(this, 'amount_token', sortDirection === 'desc' ? 'asc' : 'desc', 'number')} className={classNames("table__title table__sorting", {active: sortField === 'amount_token'}, sortField === 'amount_token' ? sortDirection : null)}>Amount in Sol</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.props.history.length ? this.props.history.map((historyItem) => {

                            let momentDateTime = moment(historyItem.createdAt);

                            return (
                                <tr key={historyItem._id}>
                                    <td>
                                        <span>{momentDateTime.format('DD[.]MM[.]YYYY')}</span>
                                        <span className="time">{momentDateTime.format('HH[:]mm')}</span>
                                    </td>
                                    <td><span className="td_short">{historyItem.from_addresses && historyItem.from_addresses.length ? historyItem.from_addresses.join(', ') : ' - '}</span></td>
                                    <td><span className="td_short">{historyItem.address}</span></td>
                                    <td>{historyItem.coin}</td>
                                    <td className="text_r mob_l">{historyItem.amount} {historyItem.coin}</td>
                                    <td className="text_r mob_l">{historyItem.amount_token} SOL</td>
                                </tr>
                            );
                        }) : (
                                <tr>
                                    <td colSpan="6">
                                        <div className="table__empty">
                                            No transactions yet
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                </table>
            </div>
            </div>
        );
    }
}


export default connect(
    (state) => {
        return {
            history: state.transactionHistory.get('history'),
            showPageLoader: state.transactionHistory.get('showPageLoader'),
            sortField: state.transactionHistory.get('sortField'),
            sortDirection: state.transactionHistory.get('sortDirection')
        }
    },
    {
        loadHistory: TransactionHistoryActions.loadHistory,
        changeSort: TransactionHistoryActions.changeSort,
        setVisibleFooter: GlobalActions.setVisibleFooter
    }
)(TransactionHistoryContainer);