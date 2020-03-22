import React from 'react';

import {
  Container,
  OwerContainer,
  Ower,
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
        <OwerContainer>
          <Ower>{message.ower}</Ower>
          
          <MessageDate>{message.datetime || `   -   ${new Date()}`}</MessageDate>
        </OwerContainer>
        <MessageContainer>
          <MessageText>{message.text}</MessageText>
        </MessageContainer>
      </Container>
    </ItemContainer>
  );
};

export default Message;
