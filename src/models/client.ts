import { UserPayload } from 'public/store/actions/userAction';
import { RoomPayload } from 'public/store/actions/roomAction';

export interface IMessage {
  roomId?: string;
  type: string;
  message: File | string;
}

export interface StoreState {
  user: UserPayload;
  room: RoomPayload;
}
