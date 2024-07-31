interface ReactionsType {
  likes: number;
  dislikes: number;
}

export interface PostInterface {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: ReactionsType;
  views: number;
  userId: number;
}
