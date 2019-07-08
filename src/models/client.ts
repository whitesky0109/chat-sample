import { UserPayload } from '../public/redux/actions/userAction';
import { RoomPayload } from '../public/redux/actions/roomAction';

export interface IMessage {
  roomId?: string;
  type: string;
  message: File | string;
}

export interface StoreState {
  user: UserPayload;
  room: RoomPayload;
}
