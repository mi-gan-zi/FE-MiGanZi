export interface Post {
  id: number;
  imageUrl: string;
}

export interface IPost {
  content: IPostContent;
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
}
export interface IPostContent {
  id: number;
  imageUrl: string;
}

export interface IPopular {
  address_name: string;
  content: string;
  id: number;
  imageUrl: string;
  modifiedDate: string;
  nickname: string;
  tags: string;
  viewCount: number;
  profileImage: string;
}
