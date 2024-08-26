export interface Conversation {
  id: string;
  name_conversation: string;
  isGroup: boolean;
  members: User[];
  messages: LastMessage[];
}

export interface User {
  socketId: string;
  username: string;
  fullName: string;
  roles: string[];
}

export interface LastMessage {
  id: string;
  message: string;
  createdAt: Date;
}

export enum Filter {
  FILTER_BY_GROUPS = "Groups",
  FILTER_BY_CONTACTS = "Contacts",
  NOT_FILTER = "All",
}
