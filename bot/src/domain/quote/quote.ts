export default class Quote {
  Symbol: string;
  Date: Date;
  Time: string;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume: number;

  constructor({
    Symbol,
    Date,
    Time,
    Open,
    High,
    Low,
    Close,
    Volume,
  }: {
    Symbol: string;
    Date: Date;
    Time: string;
    Open: number;
    High: number;
    Low: number;
    Close: number;
    Volume: number;
  }) {
    this.Symbol = Symbol;
    this.Date = Date;
    this.Time = Time;
    this.Open = Open;
    this.High = High;
    this.Low = Low;
    this.Close = Close;
    this.Volume = Volume;
  }
}
