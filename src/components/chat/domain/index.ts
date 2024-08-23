export interface Conversation {
  id: string;
  name_conversation: string;
  isGroup: boolean;
  members: User[];
  lastMessageDate: Date;
}

export interface User {
  socketId: string;
  username: string;
  fullName: string;
  roles: string[];
}

export enum Filter {
  FILTER_BY_GROUPS = "Groups",
  FILTER_BY_CONTACTS = "Contacts",
  NOT_FILTER = "All",
}
