import { UserId } from "./user-id.vo";


export type User = {
  id: UserId;
  name: string;
  username: string;
  email: string;
  city: string;
  website?: string;
  company?: string;
  albumIds: number[];
  todoListIds: number[];
};
