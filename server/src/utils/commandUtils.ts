export const isAValidCommand = (message: string): boolean => {
  const validCommands = ['stock'];

  return validCommands.some(cmd => cmd === message);
};

export const getCommand = (message: string): string => {
  const matchResult = message.toLowerCase().match(/(?<=\/).*.(?=\=)/);

  if (!matchResult || matchResult?.length !== 1) return null;

  return matchResult[0];
};

export const getStockCode = (message: string): string => {
  const matchResult = message.toLowerCase().match(/(?<=\=).*./);

  if (!matchResult || matchResult?.length !== 1) return null;

  const code = matchResult[0].trim();

  const onlySpecialCharacters = matchResult[0].match(/[^a-zA-Z0-9]+$/);

  if (onlySpecialCharacters || code.includes(' ') || code.includes('/'))
    return null;

  return code;
};
