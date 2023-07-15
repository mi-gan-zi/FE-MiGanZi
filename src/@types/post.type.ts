export interface Post {
  id: number;
  imageUrl: string;
}

export type Popular = {
  address_name: string;
  content: string;
  id: number;
  imageUrl: string;
  modifiedDate: string;
  nickname: string;
  tags: string;
  viewCount: number;
};
