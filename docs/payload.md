# 서버 클라이언트 간 Socket Message Payload

## login payload

```typescript
interface LoginRequest {
  name: string;
}

type LoginResponse = string;
```

## room payload

```typescript
type RoomRequest = {
  id: string;
} | null

interface IRoomInfo {
  name: string;
  users: IUser;
  creator: string;
}

interface RoomResponse {
  [roomId: string]: IRoomInfo;
}
```

## room/new Payload

```typescript
interface NewRoomRequest {
  name: string;
}
```

## room/in Payload

```typescript
interface EnterRoomRequest {
  id: string;
}

type EnterRoomReponse = string;
```

## room/out Payload

```typescript
interface LeaveRoomRequest {
  id: string;
}

type LeaveRoomReponse = string;
```

## room/message Payload

```typescript
interface MessageRequest {
  roomId?: string;
  type: string;
  message: File | string;
}

interface MessageResponse {
  userId: string;
  type: string;
  message: ArrayBuffer | string;
  date: Date;
  isMy: boolean;
}
```

## users Payload

```typescript
interface UsersResponse {
  [userId: string]: string | null;
}
```

## room/invite Payload

```typescript
interface InviteRequest {
  roomId: string;
  users: string[];
}