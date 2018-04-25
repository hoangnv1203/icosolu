import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helper from './../../../services/Helper';

class Team extends React.Component {

    constructor(props) {
        super(props);
        Helper.setDocumentTitle(props.route.title);
    }

    render() {

        return (
            <div className="team__wrap">
                <div className="box">
                    <h1 className="h1">The Solum Developer Team</h1>
                    <div className="team__itemBox two">
                        <div className="team__item col-md-5">
                            <div className="title">Karol</div>
                            <div className="desc">
                                <p>Senior Java Developer Karol comes to Solum with an impressive resume’ which includes extensive Blockchain, multichain, and Ethereum experience.</p>
                                <p>This strong Java programmer studied at the prestigious Poznan University of Technology, receiving his Master of Science degree in 2008. From bike rental software to online lumber auction sites to world renowned e-commerce projects, Karol’s experience and insights have played a strong role in many successful ventures. </p>
                            </div>
                        </div>
                        <div className="team__item col-md-7">
                            <div className="title">Lukasz </div>
                            <div className="desc">
                                <p>Senior PHP Developer Lukasz joins Solum from one of the UK’s biggest and most successful B2B marketing platforms.</p>
                                <p>As manager of the development team, he’s a renowned specialist in REST, SOAP+WSDL, Doctrine 2, ReactJS, jQuery, Bootstrap (js), Angular 2, Node.js React Native, requirejs, Drupal 7/8, Magento 2, WordPress, WebGL, HTML5.</p>
                                <p>In addition to his pivotal role in developing crowdfunding tools for the real estate market, Lukasz has designed websites and complex mechanisms for well-known tour operators, museums, and others.</p>
                            </div>
                        </div>
                    </div>
                    <div className="team__itemBox two">
                        <div className="team__item col-md-5">
                            <div className="title">Marek </div>
                            <div className="desc">
                                <p>Solum’s Senior UX Designer Marek served an integral position in developing B2B marketing platforms, mobile betting systems and dozens of other well-known and prominent projects.</p>
                                <p>As a co-owner of the digital agency Grafekt S.C., Marek’s 18 years of Graphic Designer experience as well as his expertise in HTML5, JavaScript, CSS 3 Adobe Platform and more, he’s specialized in food and beverage applications for his long list of clients around the globe. Also, Marek is an excellent photographer as well!</p>
                            </div>
                        </div>
                        <div className="team__item col-md-7">
                            <div className="title">Adam</div>
                            <div className="desc">
                                <p>Like his friend and partner Karol, Senior Java Developer Adam also received his Master of Science degree from Poznan University of Technology. His strong asynchronous programming skills combined with his extensive background and knowledge AngularJS, PrimeFaces/RichFaces (JSF) and other JavaScript frameworks give Adam a deep understanding of release management, deployment risk assessment, failure analysis and more.</p>
                                <p>Specializing in developing enterprise, cloud and mobile applications for the modern business environment, he is an essential part of the Solum team.</p>
                            </div>
                        </div>
                    </div>
                    <div className="team__itemBox">
                        <div className="team__item">
                            <div className="title">Milosz </div>
                            <div className="desc">
                                <p>Mid-senior PHP Developer Milosz comes to Solum with a passion for designing and implementing complex mechanisms and functionality. Particularly adept at preparing program-level and user-level required documentation, his experience in Drupal, Magento, WordPress, Bootstrap, Ionic, ZF2, REST, SOAP+WSDL, Doctrine 2, Node.js, Angular 2 JS, ReactJS, React Native jQuery, Bootstrap (js), CSS3 and other skills has been invaluable to projects around the world. From crowdfunding in real estate markets, websites and mobile apps, betting systems and internal CRMs for well-known tour operators, Milosz is a crucial member of the Solum Team. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(Team);