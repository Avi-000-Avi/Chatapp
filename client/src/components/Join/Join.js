import React, {useState} from 'react';
import {Link}  from 'react-router-dom';

import './Join.css';

const Join = () => {
    const [name, setName] = useState(' ');
    const [room, setRoom] = useState(' ');

    return (
        <div className = "joinOuterContainer">
            <div className = "joinInnerContainer">
                <h1 className="heading">Join</h1>
                {/*When user types something an event is going to occur and we get data from this event from event.target.value
                Since this is a name input we are going to set output of this to our name variable
                */}
                <div>
                    <input placeholder ="" className="joinInput" type="text" onChange = {(event) => setName(event.target.value)}/>
                </div>
                <div>
                    <input placeholder ="" className="joinInput mt-20" type="text" onChange = {(event) => setRoom(event.target.value)}/>
                </div>
                <Link onClick ={event => (!name|| !room)? event.preventDefault() : null} to ={`/chat?name=${name}&room =${room} `}>
                {/*Prevent user to click this data or this link to be transferred to chat application 
                if he has'nt specified the name or room as that will break our app 
                */}
                <button className="button mt-20"  type="submit">Sign in</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;