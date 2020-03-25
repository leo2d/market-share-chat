import ProccessMessageDTO from '../infra/queue/proccessMessageDTO';

export const parseBufferToMessage = (buffer: Buffer): ProccessMessageDTO => {
  const messageJson = JSON.parse(buffer.toString());
  const parsedMsg: ProccessMessageDTO = {
    ...(messageJson as any),
  };

  return parsedMsg;
};
