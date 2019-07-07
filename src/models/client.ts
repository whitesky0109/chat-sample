export interface IMessage {
  roomId: string;
  type: string;
  message: File | string;
}
