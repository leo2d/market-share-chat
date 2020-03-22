import styled from 'styled-components';

export const ChatContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  height: 100%;

  background-color: #007bff;
`;

export const ChatSquare = styled.div`
  padding: 20px;
  border-radius: 20px;
  border: solid, 3px;
  width: 100%;
  height: 500px;

  overflow-x: hidden;
  overflow-x: auto;
  text-align: justify;

  background-color: #09242b;
`;

export const InputSquare = styled.div`
  padding-top: 50px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
