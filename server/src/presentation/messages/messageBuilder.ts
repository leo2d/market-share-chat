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
  stockCode: string
): MessageBase => {
  return buildBOTMessage(
    `Yeah! 😃\nStock Code "${stockCode}" received. We'll proccess it soon.`
  );
};

export const buildCanNotProccessMsg = (stockCode: string): MessageBase => {
  return buildBOTMessage(
    `Sorry 😕\nStock Code "${stockCode}" received. But we can't proccess it for now...`
  );
};

export const buildProccessErrorMsg = (stockCode: string): MessageBase => {
  return buildBOTMessage(
    `Bad news... 😕\nWe could not find information for stock code "${stockCode}".`
  );
};

export const buildProccessSuccessMsg = (
  stockCode: string,
  quote: number
): MessageBase => {
  return buildBOTMessage(
    `We got it!! 😃\n${stockCode.toUpperCase()} quote is $${quote} per share`
  );
};
