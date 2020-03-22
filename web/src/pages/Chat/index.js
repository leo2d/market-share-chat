import React, { useState } from 'react';
import { Container, FormControl, Button, FormGroup } from 'react-bootstrap';

import { ChatContainer, ChatSquare, InputSquare } from './styles';
import Message from '../../components/Message';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { datetime: '', ower: 'James', text: 'sdfsdf sdaf asdf asdf sdf ' },
    {
      datetime: '',
      ower: 'Alexa',
      text: 'asasa s as dwdwewe e w asd asdas df sadf sf s',
    },
    {
      datetime: '',
      ower: 'Alexa',
      text: 'asasa s as dwdwewe e w asd asdas df sadf sf s',
    },
    {
      datetime: '',
      ower: 'Alexa',
      text: 'asasa s as dwdwewe e w asd asdas df sadf sf s',
    },
    {
      datetime: '',
      ower: 'Alexa',
      text: 'asasa s as dwdwewe e w asd asdas df sadf sf s',
    },
    {
      datetime: '',
      ower: 'Alexa',
      text: 'asasa s as dwdwewe e w asd asdas df sadf sf s',
    },
    {
      datetime: '',
      ower: 'Alexa',
      text: 'asasa s as dwdwewe e w asd asdas df sadf sf s',
    },
    {
      datetime: '',
      ower: 'Alexa',
      text: 'asasa s as dwdwewe e w asd asdas df sadf sf s',
    },
    {
      datetime: '',
      ower: 'Mary',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  ]);

  return (
    <Container>
      <ChatContainer>
        <ChatSquare>
          {messages.map(m => {
            return <Message key={`${m.datetime}`} message={m} />;
          })}
        </ChatSquare>
        <InputSquare>
          <FormControl
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
            type="text"
            placeholder="Type your message here"
          />
          <Button variant="dark">Send</Button>
        </InputSquare>
      </ChatContainer>
    </Container>
  );
};
export default Chat;
