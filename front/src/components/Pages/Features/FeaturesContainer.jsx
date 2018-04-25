import React from 'react';
import { connect } from 'react-redux';

import Helper from './../../../services/Helper';
import Countdown from 'react-countdown-now';

class Features extends React.Component {
    constructor(props) {
        super(props);

        Helper.setDocumentTitle(props.route.title);
    }

    render() {
        let introBgImage = [
                require('./../../../assets/images/intro_bg_1.svg'),
                require('./../../../assets/images/intro_bg_2.svg'),
                require('./../../../assets/images/intro_bg_3.svg'),
            ],
            featureImage = [
                require('./../../../assets/images/feature_1.svg'),
                require('./../../../assets/images/feature_2.svg'),
                require('./../../../assets/images/feature_3.svg'),
            ],
            timeLeft = Date.now() + 100000;

        const renderer = ({ days, hours, minutes, seconds, completed }) => {

            days = Helper.pad(days,2);
            hours = Helper.pad(hours,2);
            minutes = Helper.pad(minutes,2);
            seconds = Helper.pad(seconds,2);

            return (
                <div className="countdown__box">
                    <div className="countdown__item">
                        <div className="countdown__numberBox">
                            <span className="countdown__number">{days[0]}</span> <span className="countdown__number">{days[1]}</span>
                        </div>
                        <span className="countdown__caption">days</span>
                    </div>
                    <div className="countdown__item">
                        <div className="countdown__numberBox">
                            <span className="countdown__number">{hours[0]}</span> <span className="countdown__number">{hours[1]}</span>
                        </div>
                        <span className="countdown__caption">hours</span>
                    </div>
                    <div className="countdown__item">
                        <div className="countdown__numberBox">
                            <span className="countdown__number">{minutes[0]}</span> <span className="countdown__number">{minutes[1]}</span>
                        </div>
                        <span className="countdown__caption">minutes</span>
                    </div>
                    <div className="countdown__item">
                        <div className="countdown__numberBox">
                            <span className="countdown__number">{seconds[0]}</span> <span className="countdown__number">{seconds[1]}</span>
                        </div>
                        <span className="countdown__caption">seconds</span>
                    </div>
                </div>
            );
        };

        return (
            <div>
                <div className="section section__intro section__introFeatures">
                    <div className="moveBg">
                        <img src={introBgImage[0]} alt="" className="moveBg__pic moveBg__pic_1"/>
                        <img src={introBgImage[1]} alt="" className="moveBg__pic moveBg__pic_2"/>
                        <img src={introBgImage[2]} alt="" className="moveBg__pic moveBg__pic_3"/>
                    </div>
                    <div className="boxCenter__out">
                        <div className="boxCenter__in">
                            <div className="container">
                                <h1 className="h1">Solum</h1>
                                <div className="row">
                                    <div className="col-md-5">
                                        <p>Solum is a global computational marketplace that will utilize the untapped power of idle computing power on a distributed network of P2P nodes. The network will consist of the combined power of all the user’s idle computational power.</p>
                                    </div>
                                    <div className="col-md-5 col-md-offset-1">
                                        <p>Purchased computation can include, but is not limited to, hashpower for crypto mining purposes which is the most obvious and immediate use case. </p>
                                        <p>Buying and selling of computational power will be exchanged on a decentralized, P2P network that will run on the Ethereum blockchain, utilizing ERC20 compliant smart contracts. </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section section__market">
                    <div className="container">
                        <h3 className="h3 title__line">
                            <span className="txt">The Solum marketplace</span>
                        </h3>
                        <div className="market__list">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="market__pic"><img src={featureImage[0]} alt="" className=""/></div>
                                    <p className="market__descr">Buyers can purchase computing power from a distributed network of suppliers.</p>
                                </div>
                                <div className="col-md-3 col-md-offset-1">
                                    <div className="market__pic"><img src={featureImage[1]} alt="" className=""/></div>
                                    <p className="market__descr">Sellers can receive payment for renting out excess storage, computational power and bandwidth. </p>
                                </div>
                                <div className="col-md-4 col-md-offset-1">
                                    <div className="market__pic"><img src={featureImage[2]} alt="" className=""/></div>
                                    <p className="market__descr">Each transaction will incur a 5% fee that will be used for the maintenance of the network which will include incentives for node operation.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section section__exchange">
                    <div className="container">
                        <h3 className="h3">Hashpower Exchange for Mining </h3>
                        <div className="content">
                            <div className="row">
                                <div className="col-md-4">
                                    <p>Unlike other markets where hashpower is purchased from cloud based mining services, or where mining pools rent out their resources, <strong>Solum will also draw from a pool of distributed sellers of idle or excess computing power.</strong></p>
                                </div>
                                <div className="col-md-8">
                                    <p>Anyone with idle or excess computing power will be able to sell their computing resources to the network. The Solum platform will facilitate for payments between buyers and sellers using the Solum token.</p>
                                    <p>Hashpower buyers will no longer be reliant on the prices set by centralized cloud provider services or mining pools. Hashpower buyers will be able to participate in a distributed free market for computing resources. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section section__mining">
                    <div className="container">
                        <h3 className="h3 title__line">
                            <span className="txt">Beyond Mining</span>
                        </h3>
                        <div className="content">
                            <div className="row">
                                <div className="col-md-4">
                                    <p>Although cryptocurrency mining is the most obvious use case, the Solum network act as a global computational network and will also offer excess storage and bandwidth. Users will be able to ‘rent’ their computing power to other users on the P2P network. These P2P exchanges will be facilitated and settled using the networks own Solum token. Buyers and sellers will be able to exchange:</p>
                                    <ul className="list-doubleSquare">
                                        <li><p>CPU, GPU, and ASIC computational power.</p></li>
                                        <li><p>Excess Hard Drive storage</p></li>
                                        <li><p>Bandwidth</p></li>
                                    </ul>
                                </div>
                                <div className="col-md-8">
                                    <p>Therefore, services will not be limited to cryptocurrency hashing as practically any computational task can be enacted on the global network. Some of the further use cases can include:</p>
                                    <ul className="list-doubleSquare">
                                        <li><p>Graphics and video rendering, </p></li>
                                        <li><p>Businesses computational needs and data storage needs, </p></li>
                                        <li><p>Virtual Reality (VR) and Augmented Reality(AR) development for users where personal computing power is not sufficient.</p></li>
                                        <li><p>Educational and scientific research projects that involve computer simulations and require immense computing power, including Artificial Intelligence (AI) research</p></li>
                                        <li><p>Computational resource heavy tasks for government agencies involved in climate research will be able to conduct pattern recognition.</p></li>
                                        <li><p>Law enforcement agencies can deploy computational heavy tasks such as facial recognition.</p></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section section__network">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <h3 className="h3">The Solum network</h3>
                                <p>There are no minimum requirements for network participation as users will be able to contribute anything from singe Laptops right through to data centers. Businesses will be able to rent out idle computer resources outside of their regular trading hours. </p>
                                <p>The network will be fully decentralized and built on a P2P architecture. Node operation will be incentivized by the network. This will encourage decentralized participation in the network’s security and will eliminate central points of failure.</p>
                            </div>
                            <div className="col-md-8">
                                <h3 className="h3">User client software </h3>
                                <p>Users will be able to install user client software that interacts with the Solum network. The software can be used to identify available resources, estimate computational power necessary for each user tasks. Once the required computational requirements have been discovered on the network, buyers will be able to interact with sellers of the network to enter into agreements. All agreements will be settled using the network’s native Solum token. The client software will also act as a node an incentivized node on the network and each node will receive a proportional share of the network’s transactional fees.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section section__ico">
                    <div className="container">
                        <h3 className="h3 title__line">
                            <span className="txt">The ICO token sale </span>
                        </h3>
                        <div className="row">
                            <div className="col-md-4">
                                <p className="opacity_08"><em>A ICO will be made open to the public and will involve the sale of the Solum token in two phases. Proceeds from the ICO sale will be used for funding the development and promotion of the network and its resources.</em></p>
                            </div>
                            <div className="col-md-8">
                                <p className="title-small">The Solum project will be launched in two phases:</p>
                                <p><strong>Phase I</strong> - The first phase will include the setting up of an exchange platform for the trading of existing cloud services and mining pools. This will involve a first round sale of 272 million Solum tokens. A percentage of the sale of the Solum token will be used for the development of the Solum exchange platform. The Solum token will be used for facilitating the trading between the buyers and sellers on the platform. </p>
                                <p><strong>Phase II</strong> - The second Phase will involve the creation of a distributed computational power protocol and network, which will then be brought into the Solum exchange platform. This phase will draw on the successes of the first phase, namely, the creation of the computational power trading platform. Token holders will be given a chance to enjoy the success of developing the Solum network in a second crowdsale of the Solum token. In the second round a further 272 million Solum tokens will be issued.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <p><em>The Solum will first be supported on the Solum platforms’ own exchange, and once functional will be made available for trading on third party exchanges. The Solum token can also be used for token buy-backs by the Solum founding company.</em></p>
                                <div className="countdown__wrap">
                                    <p className="title-big">Phase I of the ICO will launch on xx/xx/xx and will run for 120 days:</p>
                                    <div id="countdown"></div>
                                    <Countdown date={timeLeft} renderer={renderer} />
                                </div>
                            </div>
                            <div className="col-md-8">
                                <p className="title-big">The Phase II crowdsale launch will be on TBD</p>
                                <p>The Distribution of the tokens will be based on the following breakdown.</p>
                                <p className="title-md">33% of the tokens will be allocated to the Solum founding company with:</p>
                                <ul className="list-doubleSquare">
                                    <li><p>50% to be used for development of the exchange and platform</p></li>
                                    <li><p>50% to be used as a marketing war-chest</p></li>
                                </ul>
                                <p>34% of the tokens will be owned by token purchasers and will be made available to use on the exchange for the purposes of buying and selling.</p>
                                <p>Any tokens that remain unsold after the 2 crowdfunding rounds will be burnt.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(Features);