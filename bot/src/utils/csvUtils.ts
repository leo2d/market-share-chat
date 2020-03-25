import * as csvParser from 'csvtojson';
import Quote from '../domain/quote/quote';

export const parseCSVStringToQuote = async (
  csvContent: string
): Promise<Quote> => {
  const parsedData = await csvParser
    .default({
      trim: true,
      checkType: true,
      colParser: {
        Symbol: {
          flat: true,
          cellParser: 'string',
        },
        Date: {
          flat: true,
          cellParser: item => {
            return new Date(item);
          },
        },
        Time: {
          flat: true,
          cellParser: 'string',
        },
        Open: {
          flat: true,
          cellParser: 'number',
        },
        High: {
          flat: true,
          cellParser: 'number',
        },
        Low: {
          flat: true,
          cellParser: 'number',
        },
        Close: {
          flat: true,
          cellParser: 'number',
        },
        Volume: {
          flat: true,
          cellParser: 'number',
        },
      },
    })
    .fromString(csvContent);

  if (parsedData && parsedData.length) {
    const quoteData = parsedData[0];
    return new Quote(quoteData);
  }
  return null;
};

export const isCSVstringValid = (csvContent: string): boolean => {
  if (!csvContent || csvContent === '' || csvContent.includes('N/D'))
    return false;
};
