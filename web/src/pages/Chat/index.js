import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Container } from 'react-bootstrap';

import { ChatContainer, ChatSquare } from './styles';
import Message from '../../components/Message';
import MessageInput from '../../components/MessageInput';
import Auth from '../../utils/auth';
import serverURL from '../../serverUrl';
import { isCommand } from '../../utils/commandUtils';

let socket;

const Chat = () => {
  const [user, setUser] = useState(Auth.getUserData().user);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io.connect(serverURL);

    socket.emit('join', { user, room: 'market-room' }, error => {
      if (error) {
        alert(error);
      }
    });

    socket.on('message', ({ message }) => {
      setMessages(messages => [...messages, message]);
    });

    socket.on('command', ({ message }) => {
      setMessages(messages => [...messages, message]);
    });
  }, []);

  const sendMessage = event => {
    event.preventDefault();

    if (message) {
      const newMessage = {
        id: `${Math.random()}`,
        author: user.username,
        text: message,
        sentAt: new Date(),
      };

      if (isCommand(message)) {
        socket.emit('command', newMessage);
      } else {
        socket.emit('message', newMessage);
      }

      setMessage('');
    }
  };

  return (
    <Container>
      <ChatContainer>
        <ChatSquare>
          {messages.map(m => {
            if (m) {
              return <Message key={m.id} message={m} />;
            }
          })}
        </ChatSquare>
        <MessageInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </ChatContainer>
    </Container>
  );
};
export default Chat;
