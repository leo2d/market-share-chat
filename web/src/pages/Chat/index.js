import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Container } from 'react-bootstrap';

import Api from '../../services/api';
import { ChatContainer, ChatSquare } from './styles';
import Message from '../../components/Message';
import MessageInput from '../../components/MessageInput';

let socket;

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [initialized, setInitialized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'g4fhfgh',
      datetime: '',
      author: 'James',
      text: 'sdfsdf sdaf asdf asdf sdf ',
    },
    {
      id: 'df3gfyt',
      datetime: '',
      author: 'Alexa',
      text: 'asasa s as dwdwewe e w asd asdas df sadf sf s',
    },
    {
      id: 'awr6sdf',
      datetime: '',
      author: 'Alexa',
      text: 'asasa s as dwdwewe e w asd asdas df sadf sf s',
    },
    {
      id: 'zxcx2cv',
      datetime: '',
      author: 'Alexa',
      text: 'asasa s as dwdwewe e w asd asdas df sadf sf s',
    },
    {
      id: 'ffger',
      datetime: '',
      author: 'Alexa',
      text: 'asasa s as dwdwewe e w asd asdas df sadf sf s',
    },
    {
      id: 'we2q',
      datetime: '',
      author: 'Alexa',
      text: 'asasa s as dwdwewe e w asd asdas df sadf sf s',
    },
    {
      id: 'tyhyth',
      datetime: '',
      author: 'Alexa',
      text: 'asasa s as dwdwewe e w asd asdas df sadf sf s',
    },
    {
      id: 'dfgdfg',
      datetime: '',
      author: 'Alexa',
      text: 'asasa s as dwdwewe e w asd asdas df sadf sf s',
    },
    {
      id: 'asdsd',
      datetime: '',
      author: 'Mary',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  ]);

  const connectToRoom = () => {
    socket.on('connect', data => {
      socket.emit('join', 'marketShare');
    });

    setInitialized(true);
  };

  useEffect(() => {
    console.log(Api.defaults.url);
    socket = io(`${Api.defaults.url}`);

    if (!initialized) {
      connectToRoom();
    }
  }, [initialized]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = event => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <Container>
      <ChatContainer>
        <ChatSquare>
          {messages.map(m => {
            return <Message key={m.id} message={m} />;
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
