export interface Comment {
  id: number;
  name: string;
  body: string;
  email?: `${string}@${string}`;
  postId?: number;
}

export interface CommentType {
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface CommentPayload {
  name: string;
  email: string;
  body: string;
  id?: number;
}

export interface UpdatePayload {
  id: number;
  changes: Partial<{ name: string; email: string; body: string }>;
}
