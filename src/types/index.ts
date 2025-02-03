  export interface User {
  id: number;
  name: string;
  userName: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  }
}

export interface Comment {
  id: number
  name: string
  body: string
  email?: string
  postId?: number
}
  
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
