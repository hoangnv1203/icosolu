import React from 'react';
import { Link } from 'react-router';

class Page404 extends React.Component {

    render() {
        return (
            <div className="section section__404">
                <div className="nf__out">
                    <div className="nf__in">
                        <div className="nf__num">404</div>
                        <div className="nf__text">Page not found</div>
                        <Link to="/" className="btn-primary nf__btn">Go Back Home</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Page404;