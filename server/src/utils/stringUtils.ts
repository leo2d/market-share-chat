export const trimAndLower = (str: string): string => {
  if (!str || str === '') throw new Error(`Invalid argument 'str' : ${str}`);

  return str.trim().toLowerCase();
};

export const stringIsValid = (str: string): boolean => {
  return !(!str || str === '' || str.trim() === '');
};
