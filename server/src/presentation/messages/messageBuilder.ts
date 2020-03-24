import MessageBase from './messageBase';

const BOTNAME = 'Market BOT';

const buildBOTMessage = (messageText: string): MessageBase => {
  const botMessage = new MessageBase({
    id: `${Math.random()}`,
    author: BOTNAME,
    text: messageText,
    sentAt: new Date(),
  });

  return botMessage;
};

export const buildWelcomeMessage = (username: string): MessageBase => {
  return buildBOTMessage(`Welcome, ${username}!`);
};

export const buildNewUserJoinedMsg = (username: string): MessageBase => {
  return buildBOTMessage(`${username} has joined!`);
};

export const buildInvalidCommandMsg = (command: string): MessageBase => {
  return buildBOTMessage(`ERROR: "${command}" is NOT a valid command!`);
};

export const buildInvalidStockCodeMsg = (message: string): MessageBase => {
  return buildBOTMessage(
    `ERROR: "${message}" does NOT contains a valid stock code!`
  );
};

export const buildReceivedValidCommandMsg = (sotckCode: string): MessageBase => {
  return buildBOTMessage(
    `Stock Code "${sotckCode}" received. We'll proccess it soon.`
  );
};
