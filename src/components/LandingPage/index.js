import React, { Component } from 'react';
import "./styles.css"

class LandingPage extends Component {
    componentDidMount(){
        var sound = document.querySelector('#keypress-sound');
        var dataText = ["Are you fully prepared for Matchday ?", "Be fully prepared with Matchday ai"];
        function typeWriter(text, i, fnCallback) {
            if (i < (text.length)) {
                document.querySelector("#landing-heading").innerHTML = text.substring(0, i+1) +'<span id="landing-cursor" aria-hidden="true"></span>';
                setTimeout(function() {
                    typeWriter(text, i + 1, fnCallback)
                }, 130);
            }
            else if (typeof fnCallback == 'function') {
                setTimeout(fnCallback, 100);
            }
        }
        function StartTextAnimation(i) {
            if (typeof dataText[i] == 'undefined'){
                    setTimeout(function() {
                    StartTextAnimation(0);
                }, 20000);
            }
            if (i < dataText.length) {
                typeWriter(dataText[i], 0, function(){
                    StartTextAnimation(i + 1);
                });
            }
        }
        sound.play();
        setTimeout(function(){
            sound.pause();
        }, 9730);
        StartTextAnimation(0);
    }

    render() { 
        return ( 
            <div id="landing-container">
                <div id="top-container">
                    <div id="landing-heading"/>
                    <div id="button-container">
                        <img alt="Not Found" src={require('./assets/trophy.png')} className="ml-lg-0 ml-3" height="40" width="40"></img>
                        <a href="/schedule">Cick to Enter</a>
                    </div>
                </div> 
                <div id="info-container">
                    <div className="info">
                        <img alt="Not Found"  src={require('./assets/first.jpg')} className="landing-info-image" height="40%"/>
                        <div>First ever data collection engine for badminton</div>
                    </div>
                    <div className="info">
                        <img alt="Not Found"  src={require('./assets/second.png')} className="landing-info-image" height="40%"/>
                        <div>Artificial Intelligence to collect million data points per match </div>
                    </div>
                    <div className="info">
                        <img alt="Not Found"  src={require('./assets/third.png')} className="landing-info-image" height="40%"/>
                        <div>Prepare 100% for every match and opponent</div>
                    </div>
                    <div className="info">
                        <img alt="Not Found"  src={require('./assets/fourth.png')} className="landing-info-image" height="40%"/>
                        <div>Find patterns in opponent’s game and gain an edge</div>
                    </div>
                    <div className="info">
                        <img alt="Not Found"  src={require('./assets/fifth.png')} className="landing-info-image" height="40%"/>
                        <div>Make full use of your recovery period</div>
                    </div>
                    <div className="info">
                        <img alt="Not Found"  src={require('./assets/sixth.png')} className="landing-info-image" height="40%"/>
                        <div>Make full use of your recovery period</div>
                    </div>
                </div>
                <audio id="keypress-sound">
                    <source src={require('./assets/typing.mp3')} autoplay></source>
                </audio>
            </div>
         );
    }
}

export default LandingPage;