import React from 'react';
import { useNavigate } from 'react-router-dom';
import vector from './../../images/vector.png';
import './spash.css';
const Splash = () => {
    const history = useNavigate();
    return (
        <div id="splash-page">
            <div id="main-banner" className="splash-section">
                <div id="message-group-banner">
                    <p>Don't want to</p>
                    <p>miss anything?</p>
                    <p>Don't worry</p>
                </div>
            </div>
            <div id="footer-message" className='splash-section'>
                    We are glad to help you!
                </div>
            <div id="in-between-message" className="splash-section">
                <p>See what's possible with our Unforgettable</p>
            </div>
            <div id="second-section" className="splash-section">
                <div id="sub-sec-1" class="sub-section-with-bg">
                    <div class="message-sub-sec"><p>Write down anything that you need to remember</p></div>
                </div>
                <div id="sub-sec-2" class="sub-section-with-bg">
                    <div class="message-sub-sec"><p>Stay on top of tasks with a dedicated Checklist</p></div>
                </div>
                <div id="sub-sec-3" class="sub-section-with-bg">
                    <div class="message-sub-sec"><p>Keep track your events</p></div>
                </div>
            </div>
            <div id="share-section" className='splash-section'>
                <div id="illustrator-img">
                    <img src={require("./../../images/share.png")}></img>
                </div>
                <div id="text-box-group">
                    <h4>Share</h4>
                    <div>Safely and securely</div>
                    <div> share your notes and checklist</div> 
                    <div> with other users</div>
                </div>
            </div>
            <div id="display-section" className='splash-section'>
                <div id="display-title">Our Display</div>
                <img id="arrow-down" src={vector} alt="arrow-down"></img>
                <div id="sub-sec-21" className="sub-section">
                   <div className="ui-example"> <img src={require("./../../images/note_splash.png")}/></div>
                   <div className="indicator">
                       <p className="right-arrow-end">Note</p>
                       <img src={require("./../../images/down-toward.png")}/>
                   </div>
                </div>
                <div id="sub-sec-22" className="sub-section">
                    <div className="indicator left-arrow">
                       <img src={require("./../../images/up-toward.png")}/>
                       <p className="left-arrow-end">Checklist</p>
                   </div>
                    <div className="ui-example"> <img src={require("./../../images/checklist_splash.png")}/></div>
                 
                </div>
                <div id="sub-sec-23" className="sub-section">
                    <div className="ui-example"><img src={require("./../../images/calendar_splash.png")}/></div>
                   <div className="indicator">
                        <p className="right-arrow-end">Calendar</p>
                       <img src={require("./../../images/down-toward.png")}/>
                   </div>
                </div>
            </div>
            <div id="action-section" className="splash-section">
                <a id="get-started" onClick={(e)=>{
                    e.preventDefault();
                    history("/sign-up");
                }} href="#">
                    Sign up today! Let's get started
                </a>
            </div>
        </div>
    );
}

export default Splash;
