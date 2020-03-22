import React from 'react';

import {
  Container,
  AuthorContainer,
  Author,
  MessageContainer,
  MessageText,
  ItemContainer,
  MessageDate,
} from './styles';

const Message = props => {
  const { message } = props;
  return (
    <ItemContainer>
      <Container>
        <AuthorContainer>
          <Author>{message.author}</Author>

          <MessageDate>
            {message.datetime || `   -   ${new Date()}`}
          </MessageDate>
        </AuthorContainer>
        <MessageContainer>
          <MessageText>{message.text}</MessageText>
        </MessageContainer>
      </Container>
    </ItemContainer>
  );
};

export default Message;
