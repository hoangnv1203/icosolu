import React from 'react';
import Countdown from 'react-countdown-now';

class IcoTimer extends React.PureComponent {

    render() {
        return (
            <Countdown
                date={this.props.time}
                renderer={(params) => {

                    let getSplitNumbers = function (num) {

                        let str = num.toString(),
                            part1 = str.length > 1 ? str[0] : 0,
                            part2 = str.length === 1 ? str[0] : str[1];

                        return (
                            <div className="countdown__numberBox">
                                <span className="countdown__number">{part1}</span>
                                <span className="countdown__number">{part2}</span>
                            </div>
                        )
                    };

                    let countdownParts = ['days', 'hours', 'minutes', 'seconds'];

                    return (
                        <div>
                            <h2 className="h2">{params.completed ? 'iCO finished' : 'iCO Started'}</h2>
                            <div className="countdown__box inverse">
                                {countdownParts.map((countdownPart) => {
                                    return (
                                        <div key={countdownPart} className="countdown__item">
                                            {getSplitNumbers(params[countdownPart])}
                                            <span className="countdown__caption">{countdownPart}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    );
                }}
            />
        )
    }

}


export default IcoTimer;