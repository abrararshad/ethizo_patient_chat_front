import React, { useEffect, useState } from 'react';
import Loader from '../loader/loader';

import './component.css';

const ChatInterface = () => {
    const api = 'http://localhost:3500';

    const [messages, setMessages] = useState([{ who: 'Bot', message: 'Hello, how can I help you?', system: true }]);
    const [askInput, setAskInputValue] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // askChatbot('Provide me some context');
        // setLoading(true);
    }, []);

    const handleInputChange = (event) => {
        setAskInputValue(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const q = askInput.trim();
        if (q !== '') {
            addNewMessage('You', q)
            askChatbot(q);
            setAskInputValue('');
        }
    };

    const addNewMessage = (who, message, is_system = false) => {
        setMessages(messages => [...messages, { who: who, message: message, system: is_system }]);
        scrollUpChat();
    };

    const askChatbot = async (message) => {
        if (loading){
            console.log('Loading...');
            return;
        }

        setLoading(true);
        sendRequest(message).then((data) => {
            setLoading(false);
            addNewMessage('Bot', data.response)
        }, (error) => {
            setLoading(false);
            console.log(error);
        });
    };

    const scrollUpChat = () => {
        const chatContainer = document.querySelector('.chat-messages');
        chatContainer.scrollTop = chatContainer.scrollHeight;
    };

    const sendRequest = async (q) => {
        const response = await fetch(`${api}/?query=${q}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
    };

    return (
        <div className="chat-interface">
            <div className="chat-container">
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        // set class if message.system is true
                        <div key={index} className={`chat-message ${message.system ? 'system-msg' : ''}`}>
                            <span className='message-owner'>{message.who}:</span> {message.message}
                        </div>
                    ))}
                </div>
                <form onSubmit={handleFormSubmit} className="chat-form">
                    <input
                        type="text"
                        value={askInput}
                        onChange={handleInputChange}
                        placeholder="Ask me anything..."
                        className="chat-input"
                    />

                    <button type="submit" className="chat-button" disabled={loading}>
                    {loading && <Loader />} {/* Display the loader if loading is true */}
                    {!loading && 'Send'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatInterface;