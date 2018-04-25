import React from 'react';
import { connect } from 'react-redux';

import Subscribe from './Subscribe';
import Helper from './../../../services/Helper';
import ModalActions from './../../../actions/ModalActions';

class About extends React.Component {
    constructor(props) {
        super(props);

        Helper.setDocumentTitle(props.route.title);
    }

    onScrollTo(e) {
        e.preventDefault();

        let scrollToElement = require('scroll-to-element');
        scrollToElement('.section__aboutProj',{
            offset: 0,
            ease: 'linear',
            duration: 500
        });
    }

    onShowVideo(e) {
        e.preventDefault();
        this.props.modalShowVideo({
            url: 'https://s3-ap-southeast-1.amazonaws.com/solumworld/Solum+alt+end+1.mp4'
        });
    }

    render() {
        let introBgImage = [
            require('./../../../assets/images/intro_bg_1.svg'),
            require('./../../../assets/images/intro_bg_2.svg'),
            require('./../../../assets/images/intro_bg_3.svg'),
        ];

        return (
            <div>
                <div className="section section__intro">
                    <div className="moveBg">
                        <img src={introBgImage[0]} alt="" className="moveBg__pic moveBg__pic_1"/>
                        <img src={introBgImage[1]} alt="" className="moveBg__pic moveBg__pic_2"/>
                        <img src={introBgImage[2]} alt="" className="moveBg__pic moveBg__pic_3"/>
                    </div>
                    <div className="boxCenter__out">
                        <div className="boxCenter__in">
                            <div className="container">
                                <h1 className="h1">Solum</h1>
                                <p className="descr">Full-scale global computer designed to bring buyers and sellers together</p>
                                <div className="videoPlay">
                                    <div className="videoPlay__icon">
                                        <a href="" onClick={e => this.onShowVideo(e)} className="videoPlay__btn">
                                            <i className="icon-play"/>
                                        </a>
                                        <span className="glow"/>
                                    </div>
                                    <span className="videoPlay__title">Watch How It Works</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="introFooter">
                        <a href="" onClick={e => this.onScrollTo(e)} className="introFooter__btn"><i className="icon-arrow_down"/></a>
                    </div>
                </div>
                <div className="section section__aboutProj">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <h3 className="h3 title__line">
                                    <span className="txt">About Solum</span>
                                </h3>
                                <p>Solum is a global P2P marketplace for excess and idle computational power. The Solum network will be supported by its own exchange. Buyers and sellers of computational power will be able to use custom Solum client software and the native Solum token to settle trades. The Solum token will be made available during the ICO token sale. Once the sale is complete, tokens can be purchased from other users or on secondary exchanges.</p>
                                <p>The Solum exchange will be the central marketplace where buyers and sellers will be able to fulfill the supply and demand of excess and idle computational power, storage and bandwidth.</p>
                                <span className="form__title">Join Our Newsletter</span>
                                <span className="form__descr">We promise not to spam you</span>
                                <Subscribe />
                            </div>
                            <div className="col-md-8">
                                <img src="/images/about_proj.jpg" alt="" className="img-stretch"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <p>The Solum platform&#39;s most obvious and immediate use case is for the P2P provision and exchange of cryptocurrency mining resources. Buyers will be able to rent resources from suppliers on the network. As the network grows and as the wider public becomes more aware of its computational resource potential, further use cases can be explored, such as video and graphics rendering, virtual reality, augmented reality, machine learning and artificial intelligence development and research tasks, pattern recognition for climate science and facial recognition for law enforcement agencies, and more.</p>
                            </div>
                            <div className="col-md-8">
                                <p>There are no minimum requirements for users to contribute resources to the network for payment. Individuals can make their laptops, connected hard drives and bandwidth available. Businesses can also contribute computing resources outside of their trading hours on a secure decentralized platform. </p>
                                <p>Node operators will also be incentivized to secure the network. Client software will enable users to interact with the Solum exchange and platform, to work out computational power requirements and availability, and to settle all trades.</p>
                                <p>The tokens will be made available to the public during the Solum token sale. Once the sale is complete any unsold tokens will be burnt. Tokens can then be purchased directly from token holders through the Solum exchange initially and then on third party exchanges as the network grows.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section section__roadmap">
                    <div className="container">
                        <h3 className="h3">Roadmap</h3>
                        <div className="roadmap__list">

                            <div className="roadmap__item special">
                                <div className="roadmap__point">
                                    <span className="roadmap__step">1</span>
                                </div>
                                <div className="roadmap__content">
                                    <span className="roadmap__title">Solum Token Presale</span>
                                    <div className="roadmap__date">120 days</div>
                                </div>
                            </div>
                            <div className="roadmap__item">
                                <div className="roadmap__point">
                                    <span className="roadmap__step">2</span>
                                </div>
                                <div className="roadmap__content">
                                    <span className="roadmap__title">Develop and Build "Proof of Concept" Alpha Version</span>
                                    <div className="roadmap__date">3 months</div>
                                </div>
                            </div>
                            <div className="roadmap__item">
                                <div className="roadmap__point">
                                    <span className="roadmap__step">3</span>
                                </div>
                                <div className="roadmap__content">
                                    <span className="roadmap__title">Develop and Build Beta Version</span>
                                    <div className="roadmap__date">3 months</div>
                                </div>
                            </div>
                            <div className="roadmap__item">
                                <div className="roadmap__point">
                                    <span className="roadmap__step">4</span>
                                </div>
                                <div className="roadmap__content">
                                    <span className="roadmap__title">Beta Operation</span>
                                    <div className="roadmap__date">3 months</div>
                                </div>
                            </div>
                            <div className="roadmap__item special">
                                <div className="roadmap__point">
                                    <span className="roadmap__step">5</span>
                                </div>
                                <div className="roadmap__content">
                                    <span className="roadmap__title">ICO to Develop and Build P2P Network</span>
                                    <div className="roadmap__date">till finished</div>
                                </div>
                            </div>
                            <div className="roadmap__item">
                                <div className="roadmap__point">
                                    <span className="roadmap__step">6</span>
                                </div>
                                <div className="roadmap__content">
                                    <span className="roadmap__title">P2P Computer Development Begins </span>
                                    <div className="roadmap__date">36-48 months</div>
                                </div>
                            </div>
                            <div className="roadmap__item">
                                <div className="roadmap__point">
                                    <span className="roadmap__step">7</span>
                                </div>
                                <div className="roadmap__content">
                                    <span className="roadmap__title">Any Remaining Funds Left Over Will be Used to Launch Venture Capital Fund</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section section__subs">
                    <div className="container">
                        <span className="form__title">Subscribe to Our Newsletter</span>
                        <span className="form__descr">We promise not to spam you</span>
                        <Subscribe />
                    </div>
                </div>
                <iframe id="getresponse_form" style={{display: "none"}} className="hidden getresponse-form" />
            </div>
        );
    }
}

export default connect(
    (state) => ({

    }),
    (dispatch) => ({
        modalShowVideo: (params) => dispatch(ModalActions.showVideo(params))
    })
)(About);