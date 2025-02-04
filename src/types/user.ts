export interface User {
  id: number;
  name: string;
  userName: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

export interface UsersState {
  users: User[];
  status: string;
}
