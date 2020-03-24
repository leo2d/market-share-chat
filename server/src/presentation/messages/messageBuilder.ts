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
  return buildBOTMessage(`Welcome, ${username}! 😄`);
};

export const buildNewUserJoinedMsg = (username: string): MessageBase => {
  return buildBOTMessage(`${username} has joined! 👊`);
};

export const buildInvalidCommandMsg = (command: string): MessageBase => {
  return buildBOTMessage(`Hmmm... 🤨\n"${command}" is NOT a valid command!`);
};

export const buildInvalidStockCodeMsg = (message: string): MessageBase => {
  return buildBOTMessage(
    `Hmmm... 🤨\n"${message}" does NOT contains a valid stock code!`
  );
};

export const buildReceivedValidCommandMsg = (
  sotckCode: string
): MessageBase => {
  return buildBOTMessage(
    `Yeah! 😃\nStock Code "${sotckCode}" received. We'll proccess it soon.`
  );
};

export const buildFailedProccessMsg = (sotckCode: string): MessageBase => {
  return buildBOTMessage(
    `Sorry 😕\nStock Code "${sotckCode}" received. But we can't proccess it for now...`
  );
};
