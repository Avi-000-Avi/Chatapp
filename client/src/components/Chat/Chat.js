import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';

let socket;

const Chat = ({location}) => {
    
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        {/* Retrieving data which the user has entered */}
        const {name,room} = queryString.parse(location.search);
        
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room}, (error) => {
            if(error){
                alert(error);
            }
        });

        return () => {
            socket.emit('disconnect');

            socket.off();
        }

    }, [ENDPOINT,location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages,message]);
        })
    },[messages])

    const sendMessage = (event) => {
        {/*When you click a button it refreshes the whole page we want to remove this default behaviour */}
        event.preventDefault();

        if(message){
            socket.emit('sendMessage',message, () => setMessage(''));
        }    
    }

    console.log(message,messages);

    return (
        <div className = "outerContainer">
            <div className = "container">
                <InfoBar room = {room}/>
                <input message = {message}  setMessage={setMessage} sendMessage ={sendMessage}/>
            </div>
        </div>
    )
}

export default Chat;