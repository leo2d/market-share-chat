export default class MessageBase {
  id: string;
  author: string;
  text: string;
  sentAt: Date;

  constructor({
    id,
    author,
    text,
    sentAt,
  }: {
    id: string;
    author: string;
    text: string;
    sentAt: Date;
  }) {
    this.id = id;
    this.author = author;
    this.text = text;
    this.sentAt = sentAt;
  }
}
